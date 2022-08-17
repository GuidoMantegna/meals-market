export type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};
export type Response = {
    data: {categories: Category[]}, 
    status: number,
    statusText: string,
}