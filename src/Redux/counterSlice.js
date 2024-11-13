import { createSlice } from "@reduxjs/toolkit";

// Create a slice for counter state
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// Export the actions for use in components
export const { increment, decrement } = counterSlice.actions;

// Export the reducer to be used in the store
export default counterSlice.reducer;
