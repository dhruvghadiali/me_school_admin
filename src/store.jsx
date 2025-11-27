import { configureStore } from "@reduxjs/toolkit";

import sidebarSlice from "@MERedux/sidebar/sidebarSlice";
import loggerMiddleware from "@MERedux/middleware/logger";
import authenticationSlice from "@MERedux/authentication/authenticationSlice";

export default configureStore({
  reducer: {
    sidebar: sidebarSlice,
    authentication: authenticationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});
