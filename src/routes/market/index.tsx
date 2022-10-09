import * as React from "react";
import "./styles.scss";
import { useState, useMemo } from "react";
// REDUX
import { useAppDispatch, useAppSelector } from "store/hooks";
import { addProduct } from "store/features/products";
// APP COMPONENTS
import { IngItem, LoadingModal, MiniFridge, FridgeItem } from "components";
// CHAKRA
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Icon,
  VStack,
  Skeleton,
  Flex,
  Text,
  HStack,
  Center,
  Box,
  Divider,
} from "@chakra-ui/react";
// ICONS
import { BsSearch } from "react-icons/bs";
import { RiFridgeFill } from "react-icons/ri";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
// UTILS
import useIngredients from "customHooks/useIngredients";
import { Ingredient } from "types";
import { utils } from "utils";

interface IMarketProps {}
interface totals {
  qty: number;
  price: number;
}

const Market: React.FunctionComponent<IMarketProps> = (props) => {
  const { loadingIngredients, ingError, ingredients } = useIngredients();
  const [search, setSearch] = useState<string>("");
  const [searching, setSearching] = useState<string>("");
  // const [items, setItems] = useState<Ingredient[]>([]);
  const [items2, setItems2] = useState<
    Record<Ingredient["idIngredient"], { qty: number; price: number }>
  >({});
  const [onlyFavs, setOnlyFavs] = useState(false);
  // const [totals, setTotals] = useState({ qty: 0, price: 0 });
  const [page, setPage] = useState({ start: 0, end: 10 });
  const [isFridgeOpen, toggle] = useState<boolean>(false);
  const [isItemLoading, setLoadingItem] = useState<string>('');

  const dispatch = useAppDispatch();
  const favs = useAppSelector((state) => state.products.favs);

  const searchedItem = useMemo(() => {     
    let results = []

    if (onlyFavs) {
      results = ingredients.filter((ing) => (favs[ing.idIngredient] ? ing : null));
    } else {
      results = ingredients
        .filter((ing) =>
          ing.strIngredient.toLowerCase().includes(search.toLocaleLowerCase())
        )
        // .slice(page.start, page.end);
    }

    return {results: results.slice(page.start, page.end), totalResults: results.length}

  }, [searching, ingredients, onlyFavs, page]);

  const fridgeItems = useMemo(() => {
    const choosenItems = ingredients
      .filter((ing) =>
        items2[ing.idIngredient] && items2[ing.idIngredient].qty > 0
          ? ing
          : null
      )
      .map((ing) => ({ ...ing, qty: items2[ing.idIngredient].qty }));

    const totalQTY = Object.entries(items2).reduce(
      (acc, curr) => acc + curr[1].qty,
      0
    );
    const totalPrice = Object.entries(items2).reduce(
      (acc, curr) => acc + (curr[1].qty > 0 ? curr[1].price : 0),
      0
    );

    return { choosenItems, totalPrice, totalQTY };
  }, [items2]);

  const turnPage = (direction: string) => {
    if (direction === "next") {
      setPage({ start: page.start + 10, end: (page.end + 10) > searchedItem.totalResults ? searchedItem.totalResults : page.end + 10 });
    } else setPage({ start: page.start - 10, end: (page.end % 10 === 0) ? page.end - 10 : page.end - page.end % 10});
  };

  // const setItem = (newIng: Ingredient, action: string) => {
  //   const exists = items.some(
  //     (ing) => ing.idIngredient === newIng.idIngredient
  //   );
  //   if (action === "add") {
  //     setTotals({
  //       qty: totals.qty + 1,
  //       price: totals.price + utils.stringToInt(newIng.strIngredient),
  //     });
  //     if (exists) {
  //       setItems(
  //         items.map((item) => {
  //           if (item.idIngredient === newIng.idIngredient) {
  //             return { ...item, qty: item.qty + 1 };
  //           } else {
  //             return item;
  //           }
  //         })
  //       );
  //     } else {
  //       setItems(items.concat({ ...newIng, qty: 1 }));
  //     }
  //   } else {
  //     setItems(
  //       items.filter((item) => item.idIngredient !== newIng.idIngredient)
  //     );
  //     setTotals({
  //       qty: totals.qty - newIng.qty,
  //       price:
  //         totals.price - newIng.qty * utils.stringToInt(newIng.strIngredient),
  //     });
  //   }
  // };

  const addItem = (
    idIngredient: string,
    strIngredient: string,
    action: string
  ) => {
    setLoadingItem(idIngredient)
    setItems2({
      ...items2,
      [idIngredient]: {
        qty:
          items2[idIngredient] && action === "add"
            ? items2[idIngredient].qty + 1
            : items2[idIngredient] && action === "remove"
            ? 0
            : 1,
        price: items2[idIngredient]
          ? items2[idIngredient].price + utils.stringToInt(strIngredient)
          : utils.stringToInt(strIngredient),
      },
    });
    setTimeout(() => setLoadingItem(''), 500)
  };

  if (loadingIngredients) return <LoadingModal />;

  return (
    <Flex pos="relative" justify="center" p={2} grow={1} overflow="hidden">
      <Flex
        w={{ base: "75%", lg: "40%" }}
        pos={{ base: "absolute", lg: "initial" }}
        zIndex={3}
        left={0}
        top="80px"
        transform={{
          base: isFridgeOpen ? "initial" : "translateX(-100%)",
          lg: "initial",
        }}
        transition=".5s all"
      >
        <MiniFridge
          totals={{ qty: fridgeItems.totalQTY, price: fridgeItems.totalPrice }}
        >
          {/* {items.map((product) => { */}
          {fridgeItems.choosenItems.map((product) => {
            return (
              <>
                <Skeleton key={product.idIngredient} isLoaded={!(product.idIngredient === isItemLoading)} w="100%" borderRadius={5}>
                  <FridgeItem
                    strIngredient={product.strIngredient}
                    // key={product.idIngredient}
                    idIngredient={product.idIngredient}
                    qty={product.qty}
                    // removeItem={() => setItem(product, "remove")}
                    removeItem2={() =>
                      addItem(
                        product.idIngredient,
                        product.strIngredient,
                        "remove"
                      )
                    }
                  />
                  <Divider mt={2} />
                </Skeleton>
              </>
            );
          })}
        </MiniFridge>
      </Flex>
      <Flex w={{ base: "100%", lg: "60%" }} mt="25px">
        <VStack w="95%" spacing={5}>
          <HStack justify="space-around" w="100%">
            <HStack pos="relative" spacing={5}>
              <Icon
                as={RiFridgeFill}
                boxSize={{ base: 6, lg: 8 }}
                color="gray.600"
                onClick={() => toggle(!isFridgeOpen)}
              />
              <Center
                borderRadius="50%"
                border="1px solid"
                backgroundColor="gray.600"
                color="white"
                fontSize="0.65em"
                h="25px"
                w="25px"
                pos="absolute"
                left="-7px"
                bottom="17px"
              >
                {fridgeItems.totalQTY}
              </Center>
              <Text textAlign="center" fontSize={{ base: "xs", lg: "sm" }}>
                Total: $ {fridgeItems.totalPrice.toFixed(2)}
              </Text>
            </HStack>

            <Box>
              <Button
                variant="outline"
                w={{ base: "75px", lg: "100px" }}
                colorScheme="green"
                disabled={fridgeItems.totalQTY === 0}
                size={{ base: "xs", lg: "sm" }}
              >
                BUY
              </Button>
              <Button
                variant="outline"
                w={{ base: "75px", lg: "100px" }}
                marginLeft={2}
                colorScheme="red"
                disabled={fridgeItems.totalQTY === 0}
                size={{ base: "xs", lg: "sm" }}
              >
                FORGET
              </Button>
            </Box>
          </HStack>
          <InputGroup size="md">
            <Input
              value={search}
              placeholder="Enter password"
              onChange={(e) => setSearch(e.target.value)}
              type="text"
            />
            <InputRightElement right="12px">
              <Button
                h="100%"
                size="sm"
                onClick={() => {
                  setSearching(search) 
                  setPage({start: 0, end: 10})
                }}
                variant="outline"
                borderRadius="0"
              >
                <Icon as={BsSearch} />
              </Button>
              <Button
                h="100%"
                w="100%"
                size="sm"
                onClick={() => setOnlyFavs(!onlyFavs)}
                variant="outline"
                borderRadius="0 5px 5px 0"
              >
                <Icon
                  as={onlyFavs ? AiFillStar : AiOutlineStar}
                  boxSize={{ base: 4, lg: 6 }}
                />
              </Button>
            </InputRightElement>
          </InputGroup>
          <VStack
            w="100%"
            p={{ lg: "5px" }}
            overflowY="scroll"
            css={utils.customScrollBar}
          >
            {searchedItem.results.map((ing) => {
              return (
                <Skeleton
                  borderRadius={10}
                  w="95%"
                  key={ing.idIngredient}
                  isLoaded={!loadingIngredients}
                >
                  <IngItem
                    strIngredient={ing.strIngredient}
                    idIngredient={ing.idIngredient}
                    // addItem={() => setItem(ing, "add")}
                    addItem={() =>
                      addItem(ing.idIngredient, ing.strIngredient, "add")
                    }
                    ingredient={ing}
                    isBTNDisabled={ing.idIngredient === isItemLoading}
                  />
                </Skeleton>
              );
            })}
          </VStack>
          <HStack spacing={6}>
            <Button
              size="xs"
              variant="outline"
              onClick={() => turnPage("prev")}
            >
              <Icon as={CgPlayTrackPrev} boxSize={{ base: 4, lg: 6 }} />
              <Text fontSize="xs">Prev</Text>
            </Button>
            <Text>
              {page.start + 1} to {page.end} ({searchedItem.totalResults})
            </Text>
            <Button
              size="xs"
              variant="outline"
              onClick={() => turnPage("next")}
            >
              <Text fontSize="xs">Next</Text>
              <Icon as={CgPlayTrackNext} boxSize={{ base: 4, lg: 6 }} />
            </Button>
          </HStack>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default Market;
