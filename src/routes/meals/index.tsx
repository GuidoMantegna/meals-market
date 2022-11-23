import * as React from "react";
import { useState, useEffect, Suspense } from "react";
// APP COMPONENTS
import { FoodCard } from "components";
// CHAKRA COMPONENTS
import { Flex, Select, Skeleton, Box, useMediaQuery } from "@chakra-ui/react";
// UTILS
import { useCategories, useMeals } from "customHooks";
import { Category, Meal } from "types";
// CAROUSEL TOOLS
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
// import "swiper/css/grid";
import "./styles.scss";
// import required modules
import { EffectCards, Grid } from "swiper";
import { Pagination } from "swiper";

const axios = require("axios");

interface IMarketProps {}

const Market: React.FunctionComponent<IMarketProps> = (props) => {
  const { loadingCategories, catError, categories } = useCategories();
  const { loadingMeals, mealsError, meals, fetchMeals } = useMeals(
    "",
    "multipleMeals"
  );
  const [category, setCategory] = useState("Beef");
  const [isMedium, isXLarge, is2XL] = useMediaQuery(["(min-width: 768px)", "(min-width: 1280px)", "(min-width: 1536px)"]);

  const handleChange = (e: any) => {
    fetchMeals(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.target.value}`
    );
    setCategory(e.target.value);
  };

  useEffect(() => {
    fetchMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef`);
  }, []);

  return (
    <>
      <Flex
        w={{ base: "95%", sm: "85%", md: "100%", lg: "95%" }}
        direction={{ base: "column" }}
        align="center"
      >
        <Skeleton isLoaded={!loadingCategories} w="100%" borderRadius={10} m={{md: "30px 0 15px", lg: "0"}}>
          <Select
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
        <Box
          w={{base: '90%', md: '100%'}} maxW={{ base: "355px", md: "525px", lg: "650px", xl: "1010px", ['2xl']: "1100px" }} flexGrow={1}
        >
          {/* CARDS */}
          {/* <Swiper effect={"cards"} grabCursor={true} modules={[EffectCards]}>
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
                    >
                      <FoodCard
                        title={meal.strMeal}
                        img={meal.strMealThumb}
                        id={meal.idMeal}
                        status="complete"
                        category={category}
                      />
                    </Suspense>
                  </Skeleton>
                </SwiperSlide>
              );
            })}
          </Swiper> */}

          {/* PAGINATION */}
          <Swiper 
            slidesPerView={is2XL ? 4 : isXLarge ? 3 : isMedium ? 2 : 1}
            // grid={{
            //   rows: 3
            // }}
            spaceBetween={30}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {meals?.map((meal: Meal) => {
              return (
                <SwiperSlide key={meal.idMeal}>
                  <Skeleton
                    isLoaded={loadingMeals !== "loading"}
                    startColor="teal.100"
                    endColor="teal.400"
                    borderRadius={10}
                    h="93%"
                    maxH={{base: "450px", xl: "500px"}}
                  >
                    <Suspense
                    >
                      <FoodCard
                        title={meal.strMeal}
                        img={meal.strMealThumb}
                        id={meal.idMeal}
                        status="complete"
                        category={category}
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
