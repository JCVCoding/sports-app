import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "../components/layout_components/comment/commentSlice";

export const makeStore = () => {
  return configureStore({
    reducer: { commentReducer },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
