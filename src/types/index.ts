import { NullLiteral } from "typescript";

export type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};
export type Meal = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strYoutube: string;
  ingredients: string[];
};
export type Ingredient = {
  idIngredient: string;
  strIngredient: string;
  strDescription: string;
  strType: null,
  fav: boolean,
};

export type Response = {
  data: { categories: Category[], meals: Meal[] };
  status: number;
  statusText: string;
};
export type IngResponse = {
  data: { categories: Category[], meals: Ingredient[] };
  status: number;
  statusText: string;
};
export type Action = {
  type: string;
  payload: any;
};
export type State = {
  items: number;
};
