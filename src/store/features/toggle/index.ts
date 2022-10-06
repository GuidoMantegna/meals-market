import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'store'

// Define a type for the slice state
interface ToggleState {
    fridge: boolean
  }
  
  // Define the initial state using that type
  const initialState: ToggleState = {
    fridge: false,
  }

export const toggleSlice = createSlice({
  name: 'counter',
  initialState: {
    fridge: false,
  },
  reducers: {
    toggleFridge: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.fridge = !state.fridge
    },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { toggleFridge } = toggleSlice.actions
// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter

export default toggleSlice.reducer