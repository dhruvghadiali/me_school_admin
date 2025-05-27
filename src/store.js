import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import sidebarSlice from "@MERedux/sidebar/sidebarSlice";
import loggerMiddleware from "@MERedux/middleware/logger";
import dashboardSlice from "@MERedux/dashboard/dashboardSlice";
import admissionSlice from "@MERedux/admission/admissionSlice";
import authenticationSlice from "@/slice/authentication/authenticationSlice";

export default configureStore({
  reducer: {
    authentication: authenticationSlice,
    sidebar: sidebarSlice,
    dashboard: dashboardSlice,
    admission: admissionSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk).concat(loggerMiddleware),
});
