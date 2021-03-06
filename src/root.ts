import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./store";

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
