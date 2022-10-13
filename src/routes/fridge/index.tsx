import { HStack, VStack, Box, Text, Icon } from "@chakra-ui/react";
import { FridgeItem, UserBadge, LoadingModal } from "components";
import useIngredients from "customHooks/useIngredients";
import * as React from "react";
import { useState, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { utils } from "utils";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

interface IFridgeProps {}

const Fridge: React.FunctionComponent<IFridgeProps> = (props) => {
  const { loadingIngredients, ingError, ingredients } = useIngredients();
  const savedItems = useAppSelector((state) => state.products.products);
  const favs = useAppSelector((state) => state.products.favs);

  const fridgeItems = useMemo(() => {
    const products = ingredients
      .filter((item) => (savedItems[item.idIngredient] ? item : null))
      .map((item) => ({ ...item, qty: savedItems[item.idIngredient] }));
    const totalQTY = products.reduce((acc, curr) => acc + curr.qty, 0);
    const totalPrice = products.reduce(
      (acc, curr) => acc + curr.qty * utils.stringToInt(curr.strIngredient),
      0
    );
    const totalFavs = Object.entries(favs).filter((item) => item[1]).length;

    return { products, totalQTY, totalPrice, totalFavs };
  }, [ingredients]);

  if (loadingIngredients) return <LoadingModal />;
  return (
    <>
      <HStack w="100%">
        <UserBadge
          items={fridgeItems.totalQTY}
          favs={fridgeItems.totalFavs}
          value={fridgeItems.totalPrice}
        />
        <VStack flexGrow={1} h="100%">
          {fridgeItems.products.map((item) => {
            return (
              <HStack key={item.idIngredient} w="100%">
                <FridgeItem
                  strIngredient={item.strIngredient}
                  idIngredient={item.idIngredient}
                  qty={savedItems[item.idIngredient]}
                  removeItem={() => console.log("click")}
                />
                <Icon
                  as={favs[item.idIngredient] ? AiFillStar : AiOutlineStar}
                  boxSize={{ base: 4, lg: 6 }}
                />
              </HStack>
            );
          })}
        </VStack>
      </HStack>
    </>
  );
};

export default Fridge;
