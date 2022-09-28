import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "store";
import { Ingredient } from "types";

// Define a type for the slice state
interface ProductsState {
  selectedProducts: Ingredient[];
  favs: Record<Ingredient['idIngredient'], boolean>
  // favs: {}
}

// Define the initial state using that type
const initialState: ProductsState = {
  selectedProducts: [],
  favs: {}
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Ingredient>) => {
      state.selectedProducts = [...state.selectedProducts, action.payload];
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.selectedProducts = state.selectedProducts.filter(
        (item) => item.idIngredient !== action.payload
      );
    },
    addFav: (state, action: PayloadAction<string>) => {
      state.favs = {
        ...state.favs,
        [action.payload]: !state.favs[action.payload]
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct, deleteProduct, addFav } = productsSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.products;

export default productsSlice.reducer;
