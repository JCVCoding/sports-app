import { configureStore } from "@reduxjs/toolkit";
import commentReducer, {
  CommentAPI,
} from "../components/layout_components/comment/commentSlice";

export const makeStore = () => {
  return configureStore({
    reducer: { commentReducer, [CommentAPI.reducerPath]: CommentAPI.reducer },
    middleware: (gDM) => gDM().concat(CommentAPI.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
