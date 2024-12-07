import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import loginSlice from "./slice/login/loginSlice";
import sidebarSlice from "./slice/sidebar/sidebarSlice";
import loggerMiddleware from "./slice/middleware/logger";

export default configureStore({
  reducer: {
    login: loginSlice,
    sidebar: sidebarSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk).concat(loggerMiddleware),
});
