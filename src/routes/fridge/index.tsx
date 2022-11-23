import * as React from "react";
import { useMemo } from "react";
import { NavLink } from "react-router-dom";
//REDUX
import { useAppDispatch, useAppSelector } from "store/hooks";
import { deleteProduct } from "store/features/products";
//CHAKRA COMPONENTS
import {
  HStack,
  VStack,
  Box,
  Text,
  Icon,
  Divider,
  Image,
  Flex,
} from "@chakra-ui/react";
//APP COMPONENTS
import {
  FridgeItem,
  LoadingModal,
  Alert,
} from "components";
//UTILS
import useIngredients from "customHooks/useIngredients";
import { utils } from "utils";
//IMAGES/ICONS
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import ice from "images/left-bottom-ice.png";

interface IFridgeProps {}

const Fridge: React.FunctionComponent<IFridgeProps> = (props) => {
  const dispatch = useAppDispatch();
  const { loadingIngredients, ingError, ingredients } = useIngredients();
  const savedItems = useAppSelector((state) => state.products.products);
  const favs = useAppSelector((state) => state.products.favs);
  // const user = useAppSelector((state) => state.toggle.user);

  const fridgeItems = useMemo(() => {
    const products = Object.entries(savedItems).filter(
      (item) => item[1].qty !== 0
    );
    const totalQTY = products.reduce((acc, curr) => acc + curr[1].qty, 0);
    const totalPrice = products.reduce(
      (acc, curr) => acc + curr[1].qty * utils.stringToInt(curr[1].ingredient),
      0
    );
    const totalFavs = Object.entries(favs).filter((item) => item[1]).length;

    return { products, totalQTY, totalPrice, totalFavs };
  }, [ingredients, savedItems]);

  if (loadingIngredients) return <LoadingModal />;
  return (
    <>
      <Flex
        w="100%"
        pt="25px"
        pos="relative"
        justify="center"
        p={2}
        grow={1}
        overflow="hidden"
      >
        <VStack
          flexGrow={1}
          h="100%"
          alignItems="normal"
          border="1px solid #ccc"
          w={{ base: "100%" /*lg: "60%"*/ }}
          borderRadius="5px"
          boxShadow="2px 3px 3px rgba(100, 100, 100, .5)"
          pos="relative"
          overflowY="scroll"
          css={utils.customScrollBar}
        >
          <Box h="100%" w="100%" p="25px">
            {fridgeItems.totalQTY === 0 && (
              <Alert
                status="warning"
                title="Your fridge is empty!"
                description=""
              >
                <NavLink to="/market">go to market</NavLink>
              </Alert>
            )}
            {fridgeItems.products.map((item) => {
              return (
                <VStack key={item[0]} w="100%" marginTop="10px">
                  <HStack w="100%">
                    <FridgeItem
                      strIngredient={item[1].ingredient}
                      idIngredient={item[0]}
                      qty={savedItems[item[0]].qty}
                      removeItem={() => dispatch(deleteProduct(item[0]))}
                    />
                    {/* <Icon
                  as={favs[item[0]] ? AiFillStar : AiOutlineStar}
                  boxSize={{ base: 4, lg: 6 }}
                  /> */}
                  </HStack>
                  <Divider />
                </VStack>
              );
            })}
          </Box>
          <Image
            src={ice}
            alt="ice"
            pos="sticky"
            bottom="0"
            borderRadius="0 0 5px 5px"
            zIndex={-1}
            w={{ base: "75%", lg: "50%" }}
          />
        </VStack>
      </Flex>
    </>
  );
};

export default Fridge;
