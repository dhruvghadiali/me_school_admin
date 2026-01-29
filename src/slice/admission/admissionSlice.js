import { createSlice } from "@reduxjs/toolkit";

import {
  getAcademicClasses,
  getAdmissionApplications,
} from "@/slice/admission/admissionAction";

export const admissionApplicationSlice = createSlice({
  name: "admissionApplication",
  initialState: {
    academicYears: [],
    admissionApplications: [],
    eductionBoardsWithAcademicClasses: [],
    showMasterFilter: false,
    admissionApplicationsLoader: false,
    admissionApplicationsError: "",
    selectedEductionBoard: "",
    selectedAcademicClass: "",
    selectedApplicationStatus: "",
    selectedAcademicYear: "",
  },
  reducers: {
    setEductionBoard: (state, action) => {
      state.selectedEductionBoard = action.payload;
    },
    setSelectedAcademicClass: (state, action) => {
      state.selectedAcademicClass = action.payload;
    },
    setSelectedApplicationStatus: (state, action) => {
      state.selectedApplicationStatus = action.payload;
    },
    setSelectedAcademicYear: (state, action) => {
      state.selectedAcademicYear = action.payload;
    },
    setAcademicYears: (state, action) => {
      state.academicYears = action.payload;
    },
    toggleMasterFilter: (state) => {
      state.showMasterFilter = !state.showMasterFilter;
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
  setAcademicYears,
  toggleMasterFilter,
  setSelectedAcademicYear,
  setSelectedAcademicClass,
  setSelectedApplicationStatus,
} = admissionApplicationSlice.actions;

export default admissionApplicationSlice.reducer;
