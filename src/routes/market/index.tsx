import {
  Center,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Icon,
  VStack,
  HStack,
  Flex,
  Image,
  Box,
  Skeleton,
} from "@chakra-ui/react";

import { BsSearch } from "react-icons/bs";
import * as React from "react";
import { IngItem } from "components";
import { useState } from "react";
import useIngredients from "customHooks/useIngredients";
import { Ingredient } from "types";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { addProduct } from "store/features/products";

interface IMarketProps {}

const Market: React.FunctionComponent<IMarketProps> = (props) => {
  const { loadingIngredients, ingError, ingredients } = useIngredients();
  const [search, setSearch] = useState<string>("");
  const [items, setItems] = useState<Ingredient[]>([]);
  const dispatch = useAppDispatch();
  

  const handleSearch = () => {
    const filteredItems = ingredients.filter((ing) =>
      ing.strIngredient.toLowerCase().includes(search.toLocaleLowerCase())
    );
    // const filteredItems = ingredients.filter((ing) => {
    //   if (ing.strIngredient.includes(search)) {
    //     // const item = { ...ing, fav: false}
    //     return { ...ing, fav: false };
    //     // return item;
    // }
    // return;
    // });
    setItems(filteredItems);
  };

  const addItem = (id: string) => {
    // console.log(items.filter(item => item.idIngredient === id)[0])
    dispatch(addProduct(items.filter(item => item.idIngredient === id)[0]))

  }

  return (
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
            onClick={handleSearch}
            variant="outline"
            borderRadius="0 5px 5px 0"
          >
            <Icon as={BsSearch} />
          </Button>
        </InputRightElement>
      </InputGroup>
      <VStack w="100%">
        {items.length > 0
          ? items.map((ing) => {
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
                    addItem={addItem}
                  />
                </Skeleton>
              );
            })
          : null}
      </VStack>
    </VStack>
  );
};

export default Market;
