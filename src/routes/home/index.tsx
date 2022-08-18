import * as React from "react";
import { useState, Suspense } from "react";
// import { FoodCard } from "../../components";
import { Flex, Select, Skeleton, Box } from "@chakra-ui/react";
import { useCategories, useMeals } from "../../customHooks";
import { Category, Meal } from "../../types";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "./styles.scss";
// import required modules
import { EffectCards } from "swiper";
const axios = require("axios");
const FoodCard = React.lazy(() => import('../../components/FoodCard'))

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  const { loadingCategories, catError, categories } = useCategories();
  const { loadingMeals, mealsError, meals, fetchMeals } = useMeals();

  // const handleChange = (e: React.ChangeEventHandler<HTMLSelectElement>) => {
  const handleChange = (e: any) => {
    fetchMeals(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.target.value}`
    );
  };

  return (
    <>
      <Flex
        w={{ base: "95%", sm: "85%", md: "75%", lg: "80%" }}
        direction={{ base: "column" }}
        align="center"
      >
        <Skeleton isLoaded={!loadingCategories} w="100%">
          <Select
            borderColor="white"
            boxShadow="1px 1px 2px 1px #c6c6c6"
            m="10px 0"
            // onChange={handleChange}
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
        {loadingMeals === "idle" && <FoodCard status="idle" title='Search you favourite meal'/>}
        {loadingMeals === "loading" && <FoodCard status="loading" title='Search you favourite meal'/>}
        <Box w="95%" maxW="330px">
          <Swiper effect={"cards"} grabCursor={true} modules={[EffectCards]}>
            {meals?.map((meal: Meal) => {
              return (
                <SwiperSlide key={meal.idMeal}>
                  <Suspense fallback={<FoodCard status="loading" title='Search you favourite meal'/>}>
                    <FoodCard title={meal.strMeal} img={meal.strMealThumb} status="complete" />
                  </Suspense>
                </SwiperSlide>
                // <SwiperSlide key={meal.idMeal}>
                //     <FoodCard title={meal.strMeal} img={meal.strMealThumb} status="complete" />
                // </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      </Flex>
    </>
  );
};

export default Home;
