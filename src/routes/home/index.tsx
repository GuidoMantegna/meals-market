import * as React from "react";
import { useState } from "react";
import { FoodCard } from "../../components";
import { Flex, Select, Skeleton, Box } from "@chakra-ui/react";
import { useCategories } from "../../customHooks";
import { Category } from "../../types";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
// import required modules
import { EffectCards } from "swiper";
const axios = require("axios");

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  const { loadingCategories, catError, categories } = useCategories();
  const [meals, setMeals] = useState();

  const fetchMeals = async (url: string) => {
    try {
      const response = await axios.get(url);
      setMeals(response.data.meals);
    } catch (error) {
      console.log(error);
    }
  };

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
        <Box w="300px">
          <Swiper
            // spaceBetween={50}
            // slidesPerView={1}
            // onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            // className="mySwiper"
          >
            <SwiperSlide>
              <FoodCard />
            </SwiperSlide>
            <SwiperSlide>
              <FoodCard />
            </SwiperSlide>
          </Swiper>
        </Box>
        {/* <FoodCard/> */}
      </Flex>
    </>
  );
};

export default Home;
