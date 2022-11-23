import { Meal, Response } from "../../types";
import { useEffect, useState } from "react";
const axios = require("axios");

const useMeals = (url: string, usedFor: string) => {
  const [meals, setMeals] = useState<Meal[]>();
  const [loadingMeals, setLoadingMeals] = useState("idle");
  const [mealsError, setMealsError] = useState(false);

  const fetchMeals = async (url: string) => {
    setLoadingMeals("loading");
    try {
      const response = await axios.get(url);
      const resToArray = Object.entries(response.data.meals[0]);
      const ingredients = resToArray.filter((ing) => ing[0].includes("strIngredient") && ing[1] !== "");

      usedFor === "singleMeal"
        ? setMeals([
            {
              ...response.data.meals[0],
              strYoutube: response.data.meals[0].strYoutube.replace(
                "watch?v=",
                "embed/"
              ),
              ingredients,
            },
          ])
        : setMeals(response.data.meals);
    } catch (error) {
      console.log(error);
    }
    setLoadingMeals("complete");
  };

  // useEffect(() => {
  //   fetchMeals(url);
  // }, []);

  return { loadingMeals, mealsError, meals, fetchMeals };
};

export default useMeals;
