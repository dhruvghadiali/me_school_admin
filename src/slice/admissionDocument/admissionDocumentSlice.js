import { createSlice } from "@reduxjs/toolkit";
import {
  getAcademicClasses,
  addAdmissionDocument,
  getAdmissionDocuments,
} from "@/slice/admissionDocument/admissionDocumentAction";

export const admissionDocumentSlice = createSlice({
  name: "admissionDocument",
  initialState: {
    admissionDocumentLoader: false,
    admissionDocumentFormLoader: false,
    isSchoolAdmissionFormSheetOpen: false,
    selectedEductionBoard: "",
    selectedAcademicClass: "",
    admissionDocumentError: "",
    admissionDocumentFormError: "",
    admissionDocuments: [],
    schoolAdmissionDocuments: [],
    eductionBoardsWithAcademicClasses: [],
    schoolAdmissionFormData:{}
  },
  reducers: {
    manageSchoolAdmissionFormSheetStatus: (state, action) => {
      state.isSchoolAdmissionFormSheetOpen = action.payload;
      state.admissionDocumentFormError = "";
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
      })
      .addCase(addAdmissionDocument.pending, (state) => {
        state.admissionDocumentFormLoader = true;
        state.admissionDocumentFormError = "";
      })
      .addCase(addAdmissionDocument.fulfilled, (state, action) => {
        state.admissionDocumentFormLoader = false;
        state.admissionDocumentFormError = action.payload.error;
      })
      .addCase(addAdmissionDocument.rejected, (state, action) => {
        state.admissionDocumentFormLoader = false;
        state.admissionDocumentFormError = action.payload.error;
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
