import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // default storage (localStorage)
import { combineReducers } from "redux";
import counterReducer from "./counterSlice"; // Import the counter reducer
import alertReducer from "./alertSlice";
import apiReducer from "./apiSlice";

// Combine reducers if you have multiple slices (just counter here)
const rootReducer = combineReducers({
  counter: counterReducer,
  alerts: alertReducer,
  api: apiReducer,
});

// Persist the reducer to localStorage
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types to prevent warnings
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// Persistor
export const persistor = persistStore(store);
