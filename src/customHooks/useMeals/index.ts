import { Meal, Response } from "../../types";
import React, { useState } from "react";
const axios = require("axios");

const useMeals = () => {
  const [meals, setMeals] = useState<Meal[]>();
  const [loadingMeals, setLoadingMeals] = useState('idle');
  const [mealsError, setMealsError] = useState(false);

  const fetchMeals = async (url: string) => {
    setLoadingMeals('loading')
    try {
      const response = await axios.get(url);
      setMeals(response.data.meals);
    } catch (error) {
      console.log(error);
    }
    setLoadingMeals('complete')
  };

  return { loadingMeals, mealsError, meals, fetchMeals};
};

export default useMeals;
