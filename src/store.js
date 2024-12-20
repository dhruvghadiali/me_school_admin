import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import loginSlice from "./slice/login/loginSlice";
import sidebarSlice from "./slice/sidebar/sidebarSlice";
import dashboardSlice from "./slice/dashboard/dashboardSlice";
import loggerMiddleware from "./slice/middleware/logger";

export default configureStore({
  reducer: {
    login: loginSlice,
    sidebar: sidebarSlice,
    dashboard: dashboardSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk).concat(loggerMiddleware),
});
