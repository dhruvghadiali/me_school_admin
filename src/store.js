import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import sidebarSlice from "@MERedux/sidebar/sidebarSlice";
import loggerMiddleware from "@MERedux/middleware/logger";
import dashboardSlice from "@MERedux/dashboard/dashboardSlice";
import admissionSlice from "@MERedux/admission/admissionSlice";
import academicClassSlice from "@MERedux/academicClass/academicClassSlice";
import authenticationSlice from "@/slice/authentication/authenticationSlice";

const store = configureStore({
  reducer: {
    authentication: authenticationSlice,
    sidebar: sidebarSlice,
    dashboard: dashboardSlice,
    admission: admissionSlice,
    academicClass: academicClassSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk).concat(loggerMiddleware),
});

export default store;
