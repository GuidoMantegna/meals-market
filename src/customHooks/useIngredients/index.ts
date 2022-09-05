import React, { useState, useEffect } from "react";
import { Category, Ingredient, Meal, IngResponse } from "../../types";
const axios = require("axios");

const useIngredients = () => {
  const [loadingIngredients, setLoadingIngredients] = useState(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [ingError, setIngError] = useState();

  useEffect(() => {
    setLoadingIngredients(true);
    axios
      .get('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
      .then((response: IngResponse) => {
        setIngredients(response.data.meals);
        setLoadingIngredients(false);
      })
      .catch((error: any) => setIngError(error));
  }, []);

  return { loadingIngredients, ingError, ingredients };
};

export default useIngredients;