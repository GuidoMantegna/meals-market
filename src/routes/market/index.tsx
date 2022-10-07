import * as React from "react";
import "./styles.scss";
import { useState, useMemo } from "react";
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
  FormLabel,
  FormControl,
  Switch,
  Collapse,
  Text,
  HStack,
  Center,
  Box,
  Divider,
} from "@chakra-ui/react";
// REDUX
import { useAppDispatch, useAppSelector } from "store/hooks";
import { addProduct } from "store/features/products";

import { BsSearch } from "react-icons/bs";
import { RiFridgeFill, RiArrowUpSFill } from "react-icons/ri";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";

import useIngredients from "customHooks/useIngredients";
import { Ingredient } from "types";
import { utils } from "utils";
import { start } from "repl";

interface IMarketProps {}
interface totals {
  qty: number;
  price: number;
}

const Market: React.FunctionComponent<IMarketProps> = (props) => {
  const { loadingIngredients, ingError, ingredients } = useIngredients();
  const [search, setSearch] = useState<string>("");
  const [searching, setSearching] = useState<string>("");
  const [items, setItems] = useState<Ingredient[]>([]);
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [totals, setTotals] = useState({ qty: 0, price: 0 });
  const [page, setPage] = useState({ start: 0, end: 9 });
  const [isFridgeOpen, toggle] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const favs = useAppSelector((state) => state.products.favs);
  // const isFridgeOpen = useAppSelector((state) => state.toggle.fridge);

  const searchedItem = useMemo(() => {
    if (onlyFavs) {
      return ingredients.filter((ing) => (favs[ing.idIngredient] ? ing : null));
    } else {
      return ingredients
        .filter((ing) =>
          ing.strIngredient.toLowerCase().includes(search.toLocaleLowerCase())
        )
        .slice(page.start, page.end);
    }
  }, [searching, ingredients, onlyFavs, page]);

  // const totals = useMemo(() => {
  //   return items.reduce((prev, curr) => prev.qty + curr.qty)
  // }, [items])

  const turnPage = (direction: string) => {
    if (direction === "next") {
      setPage({ start: page.start + 10, end: page.end + 10 });
    } else setPage({ start: page.start - 10, end: page.end - 10 });
  };

  const setItem = (newIng: Ingredient, action: string) => {
    // dispatch(addProduct(ing));
    const exists = items.some(
      (ing) => ing.idIngredient === newIng.idIngredient
    );
    if (action === "add") {
      setTotals({
        qty: totals.qty + 1,
        price: totals.price + utils.stringToInt(newIng.strIngredient),
      });
      if (exists) {
        setItems(
          items.map((item) => {
            if (item.idIngredient === newIng.idIngredient) {
              return { ...item, qty: item.qty + 1 };
            } else {
              return item;
            }
          })
        );
      } else {
        setItems(items.concat({ ...newIng, qty: 1 }));
      }
    } else {
      setItems(
        items.filter((item) => item.idIngredient !== newIng.idIngredient)
      );
      setTotals({
        qty: totals.qty - newIng.qty,
        price:
          totals.price - newIng.qty * utils.stringToInt(newIng.strIngredient),
      });
    }
  };

  if (loadingIngredients) return <LoadingModal />;

  return (
    <Flex pos="relative" justify="center" p={2} grow={1} overflow="hidden">
      {/* <Collapse in={isFridgeOpen} animateOpacity> */}
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
          // totalPrice={0}
          totals={totals}
        >
          {items.map((product) => {
            return (
              <>
                <FridgeItem
                  strIngredient={product.strIngredient}
                  key={product.idIngredient}
                  idIngredient={product.idIngredient}
                  qty={product.qty}
                  removeItem={() => setItem(product, "remove")}
                />
                <Divider />
              </>
            );
          })}
        </MiniFridge>
      </Flex>
      {/* </Collapse> */}
      <Flex w={{ base: "100%", lg: "60%" }} mt="25px">
        <VStack w="95%" spacing={5}>
          <HStack /*marginBottom="15px"*/ justify="space-around" w="100%">
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
                {totals.qty}
              </Center>
              <Text
                textAlign="center"
                // fontWeight="bold"
                fontSize={{ base: "xs", lg: "sm" }}
              >
                Total: $ {totals.price.toFixed(2)}
              </Text>
            </HStack>

            <Box>
              <Button
                variant="outline"
                w={{ base: "75px", lg: "100px" }}
                colorScheme="green"
                disabled={totals.qty === 0}
                size={{ base: "xs", lg: "sm" }}
              >
                BUY
              </Button>
              <Button
                variant="outline"
                w={{ base: "75px", lg: "100px" }}
                marginLeft={2}
                colorScheme="red"
                disabled={totals.qty === 0}
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
                onClick={() => setSearching(search)}
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
                {/* <Icon as={BsSearch} /> */}
                <Icon
                  as={onlyFavs ? AiFillStar : AiOutlineStar}
                  // as={AiOutlineStar}
                  boxSize={{ base: 4, lg: 6 }}
                  // color="yellow.300"
                  // onChange={() => setOnlyFavs(!onlyFavs)}

                  // onClick={() => dispatch(addFav(idIngredient))}
                />
              </Button>
            </InputRightElement>
          </InputGroup>
          {/* <FormControl
            display="flex"
            alignItems="center"
            justifyContent="center"
            m="15px"
          >
            <FormLabel htmlFor="email-alerts" mb="0">
              Only Favs
            </FormLabel>
            <Switch
              id="email-alerts"
              onChange={() => setOnlyFavs(!onlyFavs)}
              colorScheme="teal"
            />
          </FormControl> */}
          <VStack
            w="100%"
            p={{ lg: "5px" }}
            overflowY="scroll"
            // maxHeight="500px"
            css={utils.customScrollBar}
          >
            {searchedItem.map((ing) => {
              return (
                <Skeleton
                  borderRadius={10}
                  w="95%"
                  id={ing.idIngredient}
                  isLoaded={!loadingIngredients}
                >
                  <IngItem
                    strIngredient={ing.strIngredient}
                    idIngredient={ing.idIngredient}
                    addItem={() => setItem(ing, "add")}
                    ingredient={ing}
                  />
                </Skeleton>
              );
            })}
          </VStack>
          <HStack spacing={6}>
            <Button size="xs" variant="outline" onClick={() => turnPage("prev")}>
              <Icon
                as={CgPlayTrackPrev}
                boxSize={{ base: 4, lg: 6 }}
              />
              <Text fontSize="xs">Prev</Text>
            </Button>
            <Text>
              {page.start + 1} to {page.end + 1}
            </Text>
            <Button size="xs" variant="outline" onClick={() => turnPage("next")}>
              <Text fontSize="xs">Next</Text>
              <Icon
                as={CgPlayTrackNext}
                boxSize={{ base: 4, lg: 6 }}
              />
            </Button>
          </HStack>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default Market;
