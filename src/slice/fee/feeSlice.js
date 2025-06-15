import { createSlice } from "@reduxjs/toolkit";
import { getAcademicClasses, addFee } from "@/slice/fee/feeAction";

export const feeSlice = createSlice({
  name: "fee",
  initialState: {
    eductionBoardsWithAcademicClasses: [],
    selectedEductionBoard: "",
    selectedAcademicClass: "",
    feeLoader: false,
    feeError: "",
    //   isAcademicClassFormSheetOpen: false,
    //   academicClassLoader: false,
    feeFormLoader: false,
    feeFormError: "",
    // academicClassFormError: "",
    // school: "",
    // selectedEducationBoard: "",
    // educationBoards: [],
    // academicClasses: [],
    // defaultAcademicClasses: [],
  },
  reducers: {
    // manageAcademicClassFormSheetStatus: (state, action) => {
    //   state.isAcademicClassFormSheetOpen = action.payload;
    //   state.academicClassFormError = "";
    //   state.academicClassFormLoader = false;
    // },
    setEductionBoard: (state, action) => {
      state.selectedEductionBoard = action.payload;
      state.selectedAcademicClass = "";
    },
    setSelectedAcademicClass: (state, action) => {
      state.selectedAcademicClass = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAcademicClasses.pending, (state, _) => {
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
      .addCase(addFee.pending, (state, _) => {
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

export const { setEductionBoard, setSelectedAcademicClass } = feeSlice.actions;

export default feeSlice.reducer;
