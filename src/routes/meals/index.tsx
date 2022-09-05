import * as React from "react";
import { useState, Suspense } from "react";
// CHAKRA COMPONENTS
import { Flex, Select, Skeleton, Box } from "@chakra-ui/react";
// UTILS
import { useCategories, useMeals } from "customHooks";
import { Category, Meal } from "types";
// CAROUSEL TOOLS
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "./styles.scss";
// import required modules
import { EffectCards } from "swiper";

// APP COMPONENTS
// const FoodCard = React.lazy(() => import("components/FoodCard"));
import { FoodCard } from "components";
const axios = require("axios");

interface IMarketProps {}

const Market: React.FunctionComponent<IMarketProps> = (props) => {
  const { loadingCategories, catError, categories } = useCategories();
  const { loadingMeals, mealsError, meals, fetchMeals } = useMeals('', 'multipleMeals');

  // const handleChange = (e: React.ChangeEventHandler<HTMLSelectElement>) => {
  const handleChange = (e: any) => {
    fetchMeals(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.target.value}`
    );
  };
  React.useEffect(() => console.log('RENDER MARKET'), [])

  return (
    <>
      <Flex
        w={{ base: "95%", sm: "85%", md: "75%", lg: "80%" }}
        direction={{ base: "column" }}
        align="center"
      >
        <Skeleton isLoaded={!loadingCategories} w="100%" borderRadius={10}>
          <Select
            borderColor="white"
            boxShadow="1px 1px 2px 1px #c6c6c6"
            m="10px 0"
            onChange={(e) => handleChange(e)}
          >
            {categories?.map((category: Category) => {
              return (
                <option key={category.idCategory} value={category.strCategory}>
                  {category.strCategory}
                </option>
              );
            })}
          </Select>
        </Skeleton>
        {loadingMeals === "idle" && (
          <FoodCard status="idle" title="Search you favourite meal" id="" />
        )}
        <Box w="95%" maxW="330px">
          <Swiper effect={"cards"} grabCursor={true} modules={[EffectCards]}>
            {meals?.map((meal: Meal) => {
              return (
                <SwiperSlide key={meal.idMeal}>
                  <Skeleton
                    isLoaded={loadingMeals !== "loading"}
                    startColor="teal.100"
                    endColor="teal.400"
                    borderRadius={10}
                  >
                    <Suspense
                    // fallback={
                    //   <FoodCard
                    //     status="loading"
                    //     title="Search you favourite meal"
                    //   />
                    // }
                    >
                      <FoodCard
                        title={meal.strMeal}
                        img={meal.strMealThumb}
                        id={meal.idMeal}
                        status="complete"
                      />
                    </Suspense>
                  </Skeleton>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      </Flex>
    </>
  );
};

export default Market;
