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
} from "@chakra-ui/react";
// REDUX
import { useAppDispatch } from "store/hooks";
import { addProduct } from "store/features/products";

import { BsSearch } from "react-icons/bs";
import useIngredients from "customHooks/useIngredients";
import { Ingredient } from "types";

interface IMarketProps {}

const Market: React.FunctionComponent<IMarketProps> = (props) => {
  const { loadingIngredients, ingError, ingredients } = useIngredients();
  const [search, setSearch] = useState<string>("");
  const [searching, setSearching] = useState<string>("");
  const [items, setItems] = useState<Ingredient[]>([]);

  const dispatch = useAppDispatch();

  const searchedItem = useMemo(
    () =>
      ingredients.filter((ing) =>
        ing.strIngredient.toLowerCase().includes(search.toLocaleLowerCase())
      ),
    [searching, ingredients]
  );

  const addItem = (newIng: Ingredient) => {
    // dispatch(addProduct(ing));
    const exists = items.some(
      (ing) => ing.idIngredient === newIng.idIngredient
    );
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
  };

  if (loadingIngredients) return <LoadingModal />;

  return (
    <Flex align="center" justify="center" p={2} grow={1} overflow="hidden">
      <Flex grow={1}>
        <MiniFridge>
          {items.map((product) => {
            return (
              <FridgeItem
                strIngredient={product.strIngredient}
                key={product.idIngredient}
                idIngredient={product.idIngredient}
                qty={product.qty}
              />
            );
          })}
        </MiniFridge>
      </Flex>

      <Flex grow={2}>
        <VStack w="95%">
          <InputGroup size="md">
            <Input
              value={search}
              placeholder="Enter password"
              onChange={(e) => setSearch(e.target.value)}
              type="text"
            />
            <InputRightElement>
              <Button
                h="100%"
                size="sm"
                onClick={() => setSearching(search)}
                variant="outline"
                borderRadius="0 5px 5px 0"
              >
                <Icon as={BsSearch} />
              </Button>
            </InputRightElement>
          </InputGroup>
          <VStack
            w="100%"
            p="5px"
            overflowY="scroll"
            maxHeight="500px"
            css={{
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-track": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#ccc",
                borderRadius: "24px",
              },
            }}
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
                    addItem={() => addItem(ing)}
                    ingredient={ing}
                  />
                </Skeleton>
              );
            })}
          </VStack>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default Market;
