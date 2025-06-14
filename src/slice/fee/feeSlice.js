import { createSlice } from "@reduxjs/toolkit";
import { addFee } from "@/slice/fee/feeAction";

export const feeSlice = createSlice({
  name: "fee",
  initialState: {
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
  },
  extraReducers: (builder) => {
    builder
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

export const {} = feeSlice.actions;

export default feeSlice.reducer;
