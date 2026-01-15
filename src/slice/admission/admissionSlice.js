import { createSlice } from "@reduxjs/toolkit";

import {
  getAcademicClasses,
  getAdmissionApplications,
} from "@/slice/admission/admissionAction";

export const admissionApplicationSlice = createSlice({
  name: "admissionApplication",
  initialState: {
    admissionApplications: [],
    eductionBoardsWithAcademicClasses: [],
    admissionApplicationsLoader: false,
    admissionApplicationsError: "",
    selectedEductionBoard: "",
    selectedAcademicClass: "",
  },
  reducers: {
    setEductionBoard: (state, action) => {
      state.selectedEductionBoard = action.payload;
    },
    setSelectedAcademicClass: (state, action) => {
      state.selectedAcademicClass = action.payload;
    },
  },
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
      })
      .addCase(getAcademicClasses.pending, (state) => {
        state.eductionBoardsWithAcademicClasses = [];
      })
      .addCase(getAcademicClasses.fulfilled, (state, action) => {
        state.eductionBoardsWithAcademicClasses =
          action.payload.eductionBoardsWithAcademicClasses;
      })
      .addCase(getAcademicClasses.rejected, (state, action) => {
        state.eductionBoardsWithAcademicClasses = [];
      });
  },
});

export const {
  setEductionBoard,
  setSelectedAcademicClass,
} = admissionApplicationSlice.actions;

export default admissionApplicationSlice.reducer;
