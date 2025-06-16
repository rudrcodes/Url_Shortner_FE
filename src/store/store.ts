import { configureStore } from "@reduxjs/toolkit";
import { userSliceReducer } from "./Features/user.slice";

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
  },
});
