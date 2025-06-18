import { createSlice } from "@reduxjs/toolkit";
import { getAcademicClasses, addFee, getFeeTypes, getFees } from "@/slice/fee/feeAction";

export const feeSlice = createSlice({
  name: "fee",
  initialState: {
    feeError: "",
    feeFormError: "",
    selectedEductionBoard: "",
    selectedAcademicClass: "",
    isFeeFormSheetOpen: false,
    feeFormLoader: false,
    feeLoader: false,
    fees: [],
    feeTypes: [],
    eductionBoardsWithAcademicClasses: [],
  },
  reducers: {
     manageFeeFormSheetStatus: (state, action) => {
      state.isFeeFormSheetOpen = action.payload;
      state.academicClassFormError = "";
      state.academicClassFormLoader = false;
    },
    setEductionBoard: (state, action) => {
      state.fees = [];
      state.selectedEductionBoard = action.payload;
      state.selectedAcademicClass = "";
    },
    setSelectedAcademicClass: (state, action) => {
      state.selectedAcademicClass = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAcademicClasses.pending, (state) => {
        state.feeLoader = true;
        state.feeError = "";
        state.eductionBoardsWithAcademicClasses = [];
      })
      .addCase(getAcademicClasses.fulfilled, (state, action) => {
        state.feeLoader = false;
        state.feeError = action.payload.error;
        state.eductionBoardsWithAcademicClasses =
          action.payload.eductionBoardsWithAcademicClasses;
      })
      .addCase(getAcademicClasses.rejected, (state, action) => {
        state.feeLoader = false;
        state.feeError = action.payload.error;
        state.eductionBoardsWithAcademicClasses = [];
      })
      .addCase(getFeeTypes.pending, (state) => {
        state.feeTypes = [];
      })
      .addCase(getFeeTypes.fulfilled, (state, action) => {
        state.feeTypes = action.payload.feeTypes;
      })
      .addCase(getFeeTypes.rejected, (state, action) => {
        state.feeTypes = [];
      })
      .addCase(getFees.pending, (state) => {
        state.feeError = "";
        state.academicClassFormError = "";
        state.feeLoader = true;
        state.isFeeFormSheetOpen = false;
        state.academicClassFormLoader = false;
        state.fees = [];
      })
      .addCase(getFees.fulfilled, (state, action) => {
        state.feeLoader = false;
        state.feeError = action.payload.error;
        state.fees = action.payload.fees || [];
      })
      .addCase(getFees.rejected, (state, action) => {
        state.feeLoader = false;
        state.feeError = action.payload.error;
        state.fees = [];
      })
      .addCase(addFee.pending, (state) => {
        state.feeFormLoader = true;
        state.feeFormError = "";
      })
      .addCase(addFee.fulfilled, (state, action) => {
        state.feeFormLoader = false;
        state.feeFormError = action.payload.error;
      })
      .addCase(addFee.rejected, (state, action) => {
        state.feeFormLoader = false;
        state.feeFormError = action.payload.error;
      });
  },
});

export const { setEductionBoard, setSelectedAcademicClass, manageFeeFormSheetStatus } = feeSlice.actions;

export default feeSlice.reducer;
