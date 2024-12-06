import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import loginSlice from "./slice/login/loginSlice";
import loggerMiddleware from "./slice/middleware/logger";

export default configureStore({
  reducer: {
    login: loginSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk).concat(loggerMiddleware),
});
