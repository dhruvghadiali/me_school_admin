import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import signInSlice from "@MERedux/signIn/signInSlice";
import sidebarSlice from "@MERedux/sidebar/sidebarSlice";
import dashboardSlice from "@MERedux/dashboard/dashboardSlice";
import admissionSlice from "@MERedux/admission/admissionSlice";
import loggerMiddleware from "@MERedux/middleware/logger";

export default configureStore({
  reducer: {
    signIn: signInSlice,
    sidebar: sidebarSlice,
    dashboard: dashboardSlice,
    admission: admissionSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk).concat(loggerMiddleware),
});
