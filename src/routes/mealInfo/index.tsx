import * as React from "react";
import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  AspectRatio,
  Heading,
  Center,
  useColorMode,
  HStack,
  StackDivider,
  Icon,
  Skeleton,
  Button,
} from "@chakra-ui/react";
import { useMeals } from "customHooks";
import { GoLocation } from "react-icons/go";
const axios = require("axios");

interface IMealInfoProps {}

const MealInfo: React.FunctionComponent<IMealInfoProps> = (props) => {
  const { idMeal } = useParams<string>();
  const { loadingMeals, mealsError, meals, fetchMeals } = useMeals(
    "",
    "singleMeal"
  );
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  useEffect(() => {fetchMeals(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
  )}, [])

  return (
    <>
    <Skeleton isLoaded={loadingMeals !== "loading"} minW="100%">
      <Button onClick={() => navigate('/market')}>
        Return
      </Button>
      <Box
        w="100%"
        borderRadius={10}
        border={
          colorMode === "light" ? "1px solid #CDCDCD" : "1px solid #5b5b5b"
        }
        p="30px 10px 10px 10px"
        bgColor={colorMode === "light" ? "white" : "gray.700"}
      >
        <Center>
          <AspectRatio maxW="560px" w="100%" ratio={1}>
            <iframe
              title="naruto"
              src={meals && meals[0].strYoutube}
              allowFullScreen
            />
          </AspectRatio>
        </Center>
        <HStack spacing={6} m="10px 0">
          <Heading size='md'>{meals && meals[0].strMeal}</Heading>
          <HStack>
            {" "}
            <Icon as={GoLocation} boxSize={4} />
            <Text fontSize="sm">{meals && meals[0].strArea}</Text>
          </HStack>
        </HStack>
        <HStack wrap="wrap" divider={<StackDivider borderColor="gray.200" />}>
          {meals &&
            meals[0].ingredients.map((ing) => {
              return (
                <Text key={ing[0]} fontSize="xs" whiteSpace="nowrap">
                  {ing[1]}
                </Text>
              );
            })}
        </HStack>
      </Box>
    </Skeleton>

    </>
  );
};

export default MealInfo;