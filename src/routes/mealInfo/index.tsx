import * as React from "react";
import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
} from "@chakra-ui/react";
import { useMeals } from "customHooks";
import { GoLocation } from "react-icons/go";
import { LoadingModal } from "components";
// const axios = require("axios");

interface IMealInfoProps {}

const MealInfo: React.FunctionComponent<IMealInfoProps> = (props) => {
  const { idMeal, meal } = useParams<string>();
  const { loadingMeals, mealsError, meals, fetchMeals } = useMeals(
    "",
    "singleMeal"
  );
  const { colorMode } = useColorMode();

  useEffect(() => {
    fetchMeals(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    );
  }, []);

  return (
    <>
      {loadingMeals === "loading" && <LoadingModal />}
      <Skeleton isLoaded={loadingMeals !== "loading"} minW="100%">
        {/* <Button onClick={() => navigate('/market')}>
        Return
      </Button> */}
        <HStack m="10px 15px">
          <Link to={`/meals/${meal}`} style={{ fontSize: ".85em" }}>
            Meals /
          </Link>
          <Text fontWeight="bold" fontSize="sm">
            {meal}
          </Text>
        </HStack>
        <Center h="90%">
          <Box
            // display={{ lg: "flex" }}
            w={{ base: "90%", lg: "75%", '2xl': "75%" }}
            borderRadius={10}
            border={
              colorMode === "light" ? "1px solid #CDCDCD" : "1px solid #5b5b5b"
            }
            p={{ base: "10px", md: "30px 10px" }}
            bgColor={colorMode === "light" ? "white" : "gray.700"}
          >
            <Center w="100%">
              <AspectRatio maxW={{base: "450px", md: "initial"}} w={{base: "95%", md: "100%"}} ratio={{base: 1, lg: 16/9}}>
                <iframe
                  title="naruto"
                  src={meals && meals[0].strYoutube}
                  allowFullScreen
                />
              </AspectRatio>
            </Center>
            <Box>
              <HStack spacing={6} m="10px 0">
                <Heading size={{ base: "sm", lg: "md" }}>
                  {meals && meals[0].strMeal}
                </Heading>
                <HStack>
                  {" "}
                  <Icon as={GoLocation} boxSize={4} />
                  <Text fontSize="sm">{meals && meals[0].strArea}</Text>
                </HStack>
              </HStack>
              <HStack
                wrap="wrap"
                divider={<StackDivider borderColor="gray.200" />}
                spacing={1}
              >
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
          </Box>
        </Center>
      </Skeleton>
    </>
  );
};

export default MealInfo;
