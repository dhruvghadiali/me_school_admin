import { configureStore } from "@reduxjs/toolkit";

import signInSlice from "@MERedux/signIn/signInSlice";
import loggerMiddleware from "@MERedux/middleware/logger";

export default configureStore({
  reducer: {
    signIn: signInSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});
