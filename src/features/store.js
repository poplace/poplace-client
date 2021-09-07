import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  // middleware: (getDefaultMiddleware) => {
  //   if (process.env.NODE_ENV !== "production") {
  //     return getDefaultMiddleware().concat(logger);
  //   }

  //   return getDefaultMiddleware();
  // },
  devTools: process.env.NODE_ENV !== "production",
});
