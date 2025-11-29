import { createSlice } from "@reduxjs/toolkit";
import {
  addAcademicClasses,
  getAcademicClasses,
  // onChangeEductionBoard,
  // deleteAcademicClasses,
  getDefaultAcademicClasses,
} from "@/slice/academicClass/academicClassAction";
import { API_RESPONSE_MESSAGES } from "@MEHelpers/enums";

export const academicClassSlice = createSlice({
  name: "academicClass",
  initialState: {
    isAcademicClassFormSheetOpen: false,
    academicClassLoader: false,
    academicClassFormLoader: false,
    academicClassError: "",
    academicClassFormError: "",
    school: "",
    selectedEducationBoard: "",
    educationBoards: [],
    academicClasses: [],
    defaultAcademicClasses: [],
  },
  reducers: {
    manageAcademicClassFormSheetStatus: (state, action) => {
      state.isAcademicClassFormSheetOpen = action.payload;
      state.academicClassFormError = "";
      state.academicClassFormLoader = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAcademicClasses.pending, (state, _) => {
        state.isAcademicClassFormSheetOpen = false;
        state.academicClassError = "";
        state.academicClassLoader = true;
        state.school = "";
        state.educationBoards = [];
        state.academicClasses = [];
      })
      .addCase(getAcademicClasses.fulfilled, (state, action) => {
        state.academicClassError = action.payload.error;
        state.academicClassLoader = false;
        state.school = action.payload.school;
        state.selectedEducationBoard = action.payload.selectedEducationBoard;
        state.educationBoards = action.payload.educationBoards;
        state.academicClasses = action.payload.academicClasses;
      })
      .addCase(getAcademicClasses.rejected, (state, action) => {
        state.academicClassError =
          action.payload.error || API_RESPONSE_MESSAGES.SOMETHING_WENT_WRONG;
        state.academicClassLoader = false;
        state.school = "";
        state.educationBoards = [];
        state.academicClasses = [];
      })
      // .addCase(onChangeEductionBoard.pending, (state, _) => {
      //   // state.academicClassError = "";
      //   // state.academicClassLoader = true;
      //   // state.academicClasses = [];
      // })
      // .addCase(onChangeEductionBoard.fulfilled, (state, action) => {
      //   // state.academicClassError = action.payload.error;
      //   // state.academicClassLoader = false;
      //   // state.selectedEducationBoard = action.payload.selectedEducationBoard;
      //   // state.academicClasses = action.payload.academicClasses;
      // })
      // .addCase(onChangeEductionBoard.rejected, (state, action) => {
      //       // state.error = action.payload.error;
      //       // state.academicClassLoader = false;
      //       // state.academicClasses = [];
      // })
      .addCase(getDefaultAcademicClasses.pending, (state, _) => {
        state.academicClassError = "";
        state.defaultAcademicClasses = [];
      })
      .addCase(getDefaultAcademicClasses.fulfilled, (state, action) => {
        state.academicClassError = action.payload.error;
        state.defaultAcademicClasses = action.payload.defaultAcademicClasses;
      })
      .addCase(getDefaultAcademicClasses.rejected, (state, action) => {
        state.academicClassError =
          action.payload.error || API_RESPONSE_MESSAGES.SOMETHING_WENT_WRONG;
        state.defaultAcademicClasses = action.payload.defaultAcademicClasses;
      })
      .addCase(addAcademicClasses.pending, (state, _) => {
        state.academicClassFormError = "";
        state.academicClassFormLoader = true;
      })
      .addCase(addAcademicClasses.fulfilled, (state, action) => {
        state.academicClassFormError = action.payload.error;
        state.academicClassFormLoader = false;
      });
    // .addCase(addAcademicClasses.rejected, (state, action) => {
    //   // state.academicClassFormError = action.payload.error;
    //   // state.academicClassFormLoader = false;
    // })
    // .addCase(deleteAcademicClasses.pending, (state, _) => {
    //   // state.academicClassFormError = "";
    //   // state.academicClassFormLoader = true;
    // })
    // .addCase(deleteAcademicClasses.fulfilled, (state, action) => {
    //   // state.academicClassFormError = action.payload.error;
    //   // state.academicClassFormLoader = false;
    // })
    // .addCase(deleteAcademicClasses.rejected, (state, action) => {
    //   // state.academicClassFormError = action.payload.error;
    //   // state.academicClassFormLoader = false;
    // });
  },
});

export const { manageAcademicClassFormSheetStatus } =
  academicClassSlice.actions;

export default academicClassSlice.reducer;
