import { configureStore } from "@reduxjs/toolkit";

import feeSlice from "@MERedux/fee/feeSlice";
import sidebarSlice from "@MERedux/sidebar/sidebarSlice";
import loggerMiddleware from "@MERedux/middleware/logger";
import academicClassSlice from "@MERedux/academicClass/academicClassSlice";
import authenticationSlice from "@MERedux/authentication/authenticationSlice";

export default configureStore({
  reducer: {
    fee: feeSlice,
    sidebar: sidebarSlice,
    academicClass: academicClassSlice,
    authentication: authenticationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});
