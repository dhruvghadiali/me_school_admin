import { configureStore } from "@reduxjs/toolkit";

import feeSlice from "@MERedux/fee/feeSlice";
import sidebarSlice from "@MERedux/sidebar/sidebarSlice";
import loggerMiddleware from "@MERedux/middleware/logger";
import facilitySlice from "@MERedux/facility/facilitySlice";
import dashboardSlice from "@MERedux/dashboard/dashboardSlice";
import admissionApplicationSlice from "@MERedux/admission/admissionSlice";
import academicClassSlice from "@MERedux/academicClass/academicClassSlice";
import authenticationSlice from "@MERedux/authentication/authenticationSlice";
import admissionDocumentSlice from "@MERedux/admissionDocument/admissionDocumentSlice";

export default configureStore({
  reducer: {
    fee: feeSlice,
    sidebar: sidebarSlice,
    facility: facilitySlice,
    dashboard: dashboardSlice,
    academicClass: academicClassSlice,
    authentication: authenticationSlice,
    admissionDocument: admissionDocumentSlice,
    admissionApplication: admissionApplicationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});
