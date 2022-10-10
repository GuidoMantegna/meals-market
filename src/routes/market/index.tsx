import * as React from "react";
import "./styles.scss";
import { useState, useMemo, useRef } from "react";
// REDUX
import { useAppDispatch, useAppSelector } from "store/hooks";
import { addProduct } from "store/features/products";
// APP COMPONENTS
import { IngItem, LoadingModal, MiniFridge, FridgeItem } from "components";
import { MarketToolBar, PageSelector } from "./components";
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
  Divider,
} from "@chakra-ui/react";
// ICONS
import { BsSearch } from "react-icons/bs";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
// UTILS
import useIngredients from "customHooks/useIngredients";
import { Ingredient } from "types";
import { utils } from "utils";

interface IMarketProps {}

const Market: React.FunctionComponent<IMarketProps> = (props) => {
  const dispatch = useAppDispatch();
  const favs = useAppSelector((state) => state.products.favs);

  const { loadingIngredients, ingError, ingredients } = useIngredients(),
    [search, setSearch] = useState<string>(""),
    [searching, setSearching] = useState<string>(""),
    [items, setItems] = useState<
      Record<Ingredient["idIngredient"], { qty: number; price: number }>
    >({}),
    [onlyFavs, setOnlyFavs] = useState(false),
    [page, setPage] = useState({ start: 0, end: 10 }),
    [isFridgeOpen, toggle] = useState<boolean>(false),
    [isItemLoading, setLoadingItem] = useState<string>("");

  const searchedItem = useMemo(() => {
    let results = [];
    if (onlyFavs) {
      results = ingredients.filter((ing) =>
        favs[ing.idIngredient] ? ing : null
      );
    } else {
      results = ingredients.filter((ing) =>
        ing.strIngredient.toLowerCase().includes(search.toLocaleLowerCase())
      );
    }

    return {
      results: results.slice(page.start, page.end),
      totalResults: results.length,
    };
  }, [searching, ingredients, onlyFavs, page]);

  const fridgeItems = useMemo(() => {
    const choosenItems = ingredients
      .filter((ing) =>
        items[ing.idIngredient] && items[ing.idIngredient].qty > 0 ? ing : null
      )
      .map((ing) => ({ ...ing, qty: items[ing.idIngredient].qty }));
    const totalQTY = Object.entries(items).reduce(
      (acc, curr) => acc + curr[1].qty,
      0
    );
    const totalPrice = Object.entries(items).reduce(
      (acc, curr) => acc + (curr[1].qty > 0 ? curr[1].price : 0),
      0
    );

    return { choosenItems, totalPrice, totalQTY };
  }, [items]);

  const addItem = (
    idIngredient: string,
    strIngredient: string,
    action: string
  ) => {
    setLoadingItem(idIngredient);
    setItems({
      ...items,
      [idIngredient]: {
        qty:
          items[idIngredient] && action === "add"
            ? items[idIngredient].qty + 1
            : items[idIngredient] && action === "remove"
            ? 0
            : 1,
        price: items[idIngredient]
          ? items[idIngredient].price + utils.stringToInt(strIngredient)
          : utils.stringToInt(strIngredient),
      },
    });
    setTimeout(() => setLoadingItem(""), 500);
  };

  if (loadingIngredients) return <LoadingModal />;

  return (
    <Flex pos="relative" justify="center" p={2} grow={1} overflow="hidden">
      <Flex
        w={{ base: "100%", lg: "40%" }}
        h={{ base: "100%", lg: "initial" }}
        pos={{ base: "fixed", lg: "initial" }}
        zIndex={3}
        bgColor={{ base: "blackAlpha.700", lg: "initial" }}
        // left={0}
        top={0}
        transform={{
          base: isFridgeOpen ? "initial" : "translateX(-100%)",
          lg: "initial",
        }}
        transition=".5s all"
      >
        <MiniFridge
          totals={{ qty: fridgeItems.totalQTY, price: fridgeItems.totalPrice }}
          closeFridge={() => toggle(false)}
        >
          {fridgeItems.choosenItems.map((product) => {
            return (
              <>
                <Skeleton
                  key={product.idIngredient}
                  isLoaded={!(product.idIngredient === isItemLoading)}
                  w="100%"
                  borderRadius={5}
                >
                  <FridgeItem
                    strIngredient={product.strIngredient}
                    idIngredient={product.idIngredient}
                    qty={product.qty}
                    removeItem={() =>
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
          <MarketToolBar
            totalPrice={fridgeItems.totalPrice}
            totalQTY={fridgeItems.totalQTY}
            openFridge={() => toggle(true)}
          />
          <InputGroup size="md">
            <Input
              value={search}
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              type="text"
            />
            <InputRightElement right="12px">
              <Button
                h="100%"
                size="sm"
                onClick={() => {
                  setSearching(search);
                  setPage({ start: 0, end: 10 });
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
                onClick={() => {
                  setOnlyFavs(!onlyFavs)
                  // !onlyFavs && setPage({...page, start: 0})
                }}
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
            flexGrow={1}
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
          {/* <PageSelector setPage={() => setPage()}/> */}
          <HStack spacing={6}>
            <Button
              size="xs"
              variant="outline"
              onClick={() =>
                setPage(utils.turnPage("prev", page, searchedItem.totalResults))
              }
              disabled={page.start - 10 < -1}
            >
              <Icon as={CgPlayTrackPrev} boxSize={{ base: 4, lg: 6 }} />
              <Text fontSize="xs">Prev</Text>
            </Button>
            <Text>
              {page.start + 1} to{" "}
              {page.end > searchedItem.totalResults
                ? searchedItem.totalResults
                : page.end}{" "}
              ({searchedItem.totalResults})
            </Text>
            <Button
              size="xs"
              variant="outline"
              onClick={() =>
                setPage(utils.turnPage("next", page, searchedItem.totalResults))
              }
              disabled={
                searchedItem.totalResults < 10 ||
                page.end === searchedItem.totalResults
              }
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
