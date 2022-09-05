import React, { useState, useEffect } from "react";
import { Category, Response } from "../../types";
const axios = require("axios");

const useCategories = () => {
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categories, setCategories] = useState<Category[]>();
  const [catError, setCatError] = useState();

  useEffect(() => {
    setLoadingCategories(true);
    axios
      .get('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then((response: Response) => {
        setCategories(response.data.categories);
        setLoadingCategories(false);
      })
      .catch((error: any) => setCatError(error));
  }, []);

  return { loadingCategories, catError, categories };
};

export default useCategories;