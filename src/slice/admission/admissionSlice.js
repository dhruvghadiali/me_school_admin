import { createSlice } from "@reduxjs/toolkit";
import { responseMessage } from "@MEUtils/responseMessage";
import {
  admissionScreenContainerType,
  admissionScreenApplicationStatus,
} from "@MEUtils/enums";
import { admissionForm } from "@MERedux/admission/admissionAction";
import { defaultAdmissionFormData } from "@MERedux/admission/admissionDefaultStateValues";

export const admissionSlice = createSlice({
  name: "admission",
  initialState: {
    tableData: defaultAdmissionFormData,
    applicationStatus: admissionScreenApplicationStatus.ALL,
    tableDataloader: false,
    tableDataError: "",
    containerType: admissionScreenContainerType.AGGRIDTABLE,
  },
  reducers: {
    resetState: (state, _) => {
      state.tableData = defaultAdmissionFormData;
      state.containerType = admissionScreenContainerType.AGGRIDTABLE;
      state.applicationStatus = admissionScreenApplicationStatus.ALL;
      state.tableDataloader = false;
      state.tableDataError = "";
    },
    setAdmissionScreenContainerType: (state, action) => {
      state.containerType = action.payload;
    },
    setApplicationStatusFilter: (state, action) => {
      state.applicationStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(admissionForm.pending, (state, _) => {
        state.tableData = defaultAdmissionFormData;
        state.tableDataloader = true;
        state.tableDataError = "";
      })
      .addCase(admissionForm.fulfilled, (state, action) => {
        state.tableDataloader = false;
        state.tableDataError = "";
        state.tableData = action.payload;
      })
      .addCase(admissionForm.rejected, (state, action) => {
        state.tableData = defaultAdmissionFormData;
        state.tableDataloader = false;
        state.tableDataError =
          action.payload || responseMessage.somethingWentWrong;
      });
  },
});

export const {
  resetState,
  setApplicationStatusFilter,
  setAdmissionScreenContainerType,
} = admissionSlice.actions;

export default admissionSlice.reducer;
