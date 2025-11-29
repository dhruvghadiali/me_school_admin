import { configureStore } from "@reduxjs/toolkit";

import sidebarSlice from "@MERedux/sidebar/sidebarSlice";
import loggerMiddleware from "@MERedux/middleware/logger";
import academicClassSlice from "@MERedux/academicClass/academicClassSlice";
import authenticationSlice from "@MERedux/authentication/authenticationSlice";

export default configureStore({
  reducer: {
    sidebar: sidebarSlice,
    academicClass: academicClassSlice,
    authentication: authenticationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});
