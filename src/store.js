import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import loginSlice from "@MERedux/login/loginSlice";
import sidebarSlice from "@MERedux/sidebar/sidebarSlice";
import dashboardSlice from "@MERedux/dashboard/dashboardSlice";
import loggerMiddleware from "@MERedux/middleware/logger";

export default configureStore({
  reducer: {
    login: loginSlice,
    sidebar: sidebarSlice,
    dashboard: dashboardSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk).concat(loggerMiddleware),
});
