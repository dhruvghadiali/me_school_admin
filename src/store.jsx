import { configureStore } from "@reduxjs/toolkit";

import authenticationSlice from "@MERedux/authentication/authenticationSlice";
import loggerMiddleware from "@MERedux/middleware/logger";

export default configureStore({
  reducer: {
    authentication: authenticationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});
