import { createSlice } from "@reduxjs/toolkit";
import { summary } from "./dashboardAction";
import { defaultSummaryData } from "./dashboardDefaultStateValues";
import { responseMessage } from "../../utils/responseMessage";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    summaryData: {},
    loader: false,
    error: "",
    applicationFormSummaryActiveMenu: "",
    classLevelSummaryActiveMenu: "",
  },
  reducers: {
    resetState: (state, _) => {
      state.summaryData = {};
      state.loader = false;
      state.error = "";
      state.applicationFormSummaryActiveMenu = "";
      state.classLevelSummaryActiveMenu = "";
    },
    setApplicationFormSummaryActiveMenu: (state, action) => {
      state.applicationFormSummaryActiveMenu = action.payload;
    },
    setClassLevelSummaryActiveMenu: (state, action) => {
      state.classLevelSummaryActiveMenu = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(summary.pending, (state, _) => {
        state.loader = true;
        state.error = "";
        state.applicationFormSummaryActiveMenu = "";
        state.classLevelSummaryActiveMenu = "";
        state.summaryData = defaultSummaryData;
      })
      .addCase(summary.fulfilled, (state, action) => {
        state.loader = false;
        state.error = "";
        state.summaryData = action.payload;
      })
      .addCase(summary.rejected, (state, action) => {
        state.loader = false;
        state.applicationFormSummaryActiveMenu = "";
        state.classLevelSummaryActiveMenu = "";
        state.summaryData = defaultSummaryData;
        state.error = action.payload || responseMessage.somethingWentWrong;
      });
  },
});

export const {
  resetState,
  setApplicationFormSummaryActiveMenu,
  setClassLevelSummaryActiveMenu,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
