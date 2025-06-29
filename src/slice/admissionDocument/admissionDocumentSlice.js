import { createSlice } from "@reduxjs/toolkit";
import {
  getAcademicClasses,
  getAdmissionDocuments,
} from "@/slice/admissionDocument/admissionDocumentAction";

export const admissionDocumentSlice = createSlice({
  name: "admissionDocument",
  initialState: {
    admissionDocumentLoader: false,
    schoolAdmissionFormLoader: false,
    isSchoolAdmissionFormSheetOpen: false,
    selectedEductionBoard: "",
    selectedAcademicClass: "",
    admissionDocumentError: "",
    schoolAdmissionFormError: "",
    admissionDocuments: [],
    eductionBoardsWithAcademicClasses: [],
    schoolAdmissionFormData:{}
  },
  reducers: {
    manageSchoolAdmissionFormSheetStatus: (state, action) => {
      state.isSchoolAdmissionFormSheetOpen = action.payload;
      state.schoolAdmissionFormError = "";
      state.schoolAdmissionFormLoader = false;
    },
    setEductionBoard: (state, action) => {
      state.schoolAdmissionDocuments = [];
      state.selectedEductionBoard = action.payload;
      state.selectedAcademicClass = "";
    },
    setSelectedAcademicClass: (state, action) => {
      state.selectedAcademicClass = action.payload;
    },
    setSchoolAdmissionFormData: (state, action) => {
      state.schoolAdmissionFormData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAcademicClasses.pending, (state) => {
        state.admissionDocumentLoader = true;
        state.admissionDocumentError = "";
        state.eductionBoardsWithAcademicClasses = [];
      })
      .addCase(getAcademicClasses.fulfilled, (state, action) => {
        state.admissionDocumentLoader = false;
        state.admissionDocumentError = action.payload.error;
        state.eductionBoardsWithAcademicClasses =
          action.payload.eductionBoardsWithAcademicClasses;
      })
      .addCase(getAcademicClasses.rejected, (state, action) => {
        state.admissionDocumentLoader = false;
        state.admissionDocumentError = action.payload.error;
        state.eductionBoardsWithAcademicClasses = [];
      })
      .addCase(getAdmissionDocuments.pending, (state) => {
        state.admissionDocumentLoader = true;
        state.admissionDocumentError = "";
        state.admissionDocuments = [];
      })
      .addCase(getAdmissionDocuments.fulfilled, (state, action) => {
        state.admissionDocumentLoader = false;
        state.admissionDocumentError = action.payload.error;
        state.admissionDocuments = action.payload.admissionDocuments;
      })
      .addCase(getAdmissionDocuments.rejected, (state, action) => {
        state.admissionDocumentLoader = false;
        state.admissionDocumentError = action.payload.error;
        state.admissionDocuments = [];
      });
  },
});

export const {
  setEductionBoard,
  setSelectedAcademicClass,
  setSchoolAdmissionFormData,
  manageSchoolAdmissionFormSheetStatus,
} = admissionDocumentSlice.actions;

export default admissionDocumentSlice.reducer;
