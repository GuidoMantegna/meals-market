import * as React from "react";
import { FoodCard } from "../../components";
import { Flex, Select, Skeleton } from "@chakra-ui/react";
import { useCategories } from "../../customHooks";
import { Category } from "../../types";

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  const { loadingCategories, catError, categories } = useCategories();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // const handleChange = (e: any) => {
    // console.log(e.target.value)
  };

  return (
    <>
      <Flex
        w={{ base: "95%", sm: "85%", md: "75%", lg: "80%" }}
        direction={{ base: "column" }}
        align="center"
      >
        <Skeleton isLoaded={!loadingCategories} w='100%'>
          <Select
            borderColor="white"
            boxShadow="1px 1px 2px 1px #c6c6c6"
            m="10px 0"
            onChange={handleChange}
          >
            {categories?.map((category: Category) => {
              return (
                <option key={category.idCategory} value={category.idCategory}>
                  {category.strCategory}
                </option>
              );
            })}
          </Select>
        </Skeleton>
        <FoodCard />
      </Flex>
    </>
  );
};

export default Home;
