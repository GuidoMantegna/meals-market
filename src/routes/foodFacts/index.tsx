import { useState, useMemo, useEffect } from "react";
import useIngredients from "customHooks/useIngredients";
// CHAKRA
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Icon,
  Select,
  Image,
  Heading,
  VStack,
  Skeleton,
  Flex,
  Text,
  Box,
  useColorMode,
  Center,
} from "@chakra-ui/react";
// ICONS
import { Ingredient } from "types";
import { LoadingModal } from "components";

interface IFoodFactsProps {}

const FoodFacts: React.FunctionComponent<IFoodFactsProps> = (props) => {
  const { loadingIngredients, ingError, ingredients } = useIngredients();
  const { colorMode } = useColorMode();
  //   const [search, setSearch] = useState<string>("");
  const [search, setSearch] = useState<Ingredient[]>(ingredients);
  const [searching, setSearching] = useState<string>("1");

  useEffect(() => {
    console.log({
      ingError, ingredients, loadingIngredients
    })
  }, [loadingIngredients])
  const searchedItem = useMemo(() => {
    // if (searching !== "") {
    return ingredients.filter((ing) => ing.idIngredient === searching)[0];
    // } else {
    //   return ingredients[0];
    // }
  }, [searching, ingredients]);


  if (loadingIngredients) return <LoadingModal />;
  return (
    <>
      {/* <Flex flexDirection={"column"} w={{ base: "95%" }}>
        <Select
          m="10px 0"
          placeholder="Select option"
          onChange={(e) => setSearching(e.target.value)}
        >
          {ingredients.map((item) => {
            return item.strDescription ? (
              <option
                key={item.idIngredient}
                value={item.idIngredient}
                onClick={() => console.log("CLICK")}
              >
                {item.strIngredient}
              </option>
            ) : null;
          })}
        </Select>

        {/* MAIN CONTAINER 
        <Box
          w="100%"
          borderRadius={10}
          border={
            colorMode === "light" ? "1px solid #CDCDCD" : "1px solid #5b5b5b"
          }
          p={{ base: "15px", md: "30px 10px" }}
          bgColor={colorMode === "light" ? "white" : "gray.700"}
        >
          {/* TITLE 
          <Flex paddingBottom="10px" w="100%" justifyContent="space-between" align="center">
            <Heading as="h2" size="sm">
              {ingredients[0].strIngredient}
            </Heading>
            <Center
              borderRadius="50%"
              border={
                colorMode === "light"
                  ? "1px solid #CDCDCD"
                  : "1px solid #5b5b5b"
              }
              padding="2"
            >
              <Image
                src={`https://www.themealdb.com/images/ingredients/${ingredients[0].strIngredient}-Small.png`}
                // alt={title}
                w="80px"
                // fallbackSrc={ImgFallback}
              />
            </Center>
          </Flex>

          {/* BODY 
          <Flex h="90%" overflowY="scroll">
            <Text fontSize="xs" textAlign="justify">
              {ingredients[0].strDescription}
            </Text>
          </Flex>
        </Box>
      </Flex> */}
    </>
  );
};

export default FoodFacts;
