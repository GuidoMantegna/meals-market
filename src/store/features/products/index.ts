import { createSlice, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit'
import type { RootState } from 'store'
import { Ingredient } from 'types'

// Define a type for the slice state
interface ProductsState {
    selectedProducts: Ingredient[]
  }
  
  // Define the initial state using that type
  const initialState: ProductsState = {
    // selectedProducts: <Ingredient>[] = [],
    selectedProducts: [],
  }


  // const ingredientsAdapater = createEntityAdapter<Ingredient>({
    
  // })

export const productsSlice = createSlice({
  name: 'products',
  // initialState: {
  //   // selectedProducts: <Ingredient>[] = [],
  //   selectedProducts: [] = [],
  // },
  initialState,
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   // state.value += 1
    // },
    // decrement: (state) => {
    //   // state.value -= 1
    // },
    addProduct: (state, action: PayloadAction<Ingredient>) => {
      state.selectedProducts = [...state.selectedProducts, action.payload]
      // state.selectedProducts = action.payload
      // state.selectedProducts = state.selectedProducts.push(action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { addProduct } = productsSlice.actions
// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.products

export default productsSlice.reducer