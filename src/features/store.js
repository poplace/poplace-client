import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import userReducer from "./userSlice";
import modalVisibleReducer from "./modalVisibleSlice";
import currentPinReducer from "./pinSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    modalVisible: modalVisibleReducer,
    currentPin: currentPinReducer,
  },
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV !== "production") {
      return getDefaultMiddleware().concat(logger);
    }

    return getDefaultMiddleware();
  },
  devTools: process.env.NODE_ENV !== "production",
});
