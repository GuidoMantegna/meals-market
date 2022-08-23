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
};
export type Response = {
    data: {categories: Category[]}, 
    status: number,
    statusText: string,
}
export type Action = {
    type: string,
    payload: any,
}
export type State = {
    items: number,
}
