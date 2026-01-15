import { createSlice } from "@reduxjs/toolkit";

import { getAdmissionApplications } from "@/slice/admission/admissionAction";

export const admissionApplicationSlice = createSlice({
  name: "admissionApplication",
  initialState: {
    admissionApplications: [],
    admissionApplicationsLoader: false,
    admissionApplicationsError: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdmissionApplications.pending, (state, _) => {
        state.admissionApplicationsError = "";
        state.admissionApplicationsLoader = true;
        state.admissionApplications = [];
      })
      .addCase(getAdmissionApplications.fulfilled, (state, action) => {
        state.admissionApplicationsLoader = false;
        state.admissionApplicationsError = action.payload.error;
        state.admissionApplications = action.payload.admissionApplications;
      })
      .addCase(getAdmissionApplications.rejected, (state, action) => {
        state.admissionApplicationsLoader = false;
        state.admissionApplicationsError = action.payload.error;
        state.admissionApplications = [];
      });
  },
});

export const {} = admissionApplicationSlice.actions;

export default admissionApplicationSlice.reducer;
