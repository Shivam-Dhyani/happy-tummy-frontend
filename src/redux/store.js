import { configureStore } from "@reduxjs/toolkit";
import allSlice from "./slices/allSlice";

export const store = configureStore({
  reducer: {
    all: allSlice,
  },
});
