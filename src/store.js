import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import feeSlice from "@/slice/fee/feeSlice";
import sidebarSlice from "@MERedux/sidebar/sidebarSlice";
import loggerMiddleware from "@MERedux/middleware/logger";
import facilitySlice from "@/slice/facility/facilitySlice";
import dashboardSlice from "@MERedux/dashboard/dashboardSlice";
import admissionSlice from "@MERedux/admission/admissionSlice";
import academicClassSlice from "@MERedux/academicClass/academicClassSlice";
import authenticationSlice from "@/slice/authentication/authenticationSlice";
import admissionDocumentSlice from "@/slice/admissionDocument/admissionDocumentSlice";

const store = configureStore({
  reducer: {
    fee: feeSlice,
    sidebar: sidebarSlice,
    facility: facilitySlice,
    dashboard: dashboardSlice,
    admission: admissionSlice,
    academicClass: academicClassSlice,
    authentication: authenticationSlice,
    admissionDocument: admissionDocumentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk).concat(loggerMiddleware),
});

export default store;
