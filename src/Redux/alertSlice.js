import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alerts: {
    person: false,
    car: false,
    bicycle: false,
    dog: false,
    cat: false,
  },
  totalAlert: 0, // New field to track total alert count
};

const alertSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    toggleAlert: (state, action) => {
      const { type } = action.payload;
      state.alerts[type] = !state.alerts[type];
    },
    setAlert: (state, action) => {
      const { type, value } = action.payload;
      state.alerts[type] = value;
    },
    incrementTotalAlert: (state) => {
      state.totalAlert += 1; // Increment the total alert count
    },
    clearTotalAlert: (state) => {
      state.totalAlert = 0;
    },
  },
});

export const { toggleAlert, setAlert, incrementTotalAlert, clearTotalAlert } =
  alertSlice.actions;
export default alertSlice.reducer;
