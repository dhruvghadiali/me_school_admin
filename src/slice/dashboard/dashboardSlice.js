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
    applicationFormSummaryBarChartColor: "",
    classLevelSummaryActiveMenu: "",
  },
  reducers: {
    resetState: (state, _) => {
      state.summaryData = {};
      state.loader = false;
      state.error = "";
      state.applicationFormSummaryActiveMenu = "";
      state.applicationFormSummaryBarChartColor = "";
      state.classLevelSummaryActiveMenu = "";
    },
    setApplicationFormSummaryActiveMenu: (state, action) => {
      state.applicationFormSummaryActiveMenu = action.payload;
    },
    setApplicationFormSummaryBarChartColor: (state, action) => {
      let color = '';
      switch(action.payload){
        case 0:
          color = '#3b98ba';
          break;
        case 1:
          color = '#60b159';
          break;
        case 2:
          color = '#ab4459';
          break;
        case 3:
          color = '#d17615';
          break;
        default:
          color = '#1b1b1d';
          break;
      }

      state.applicationFormSummaryBarChartColor = color;
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
        state.summaryData = defaultSummaryData;
      })
      .addCase(summary.fulfilled, (state, action) => {
        state.loader = false;
        state.error = "";
        state.summaryData = action.payload;
      })
      .addCase(summary.rejected, (state, action) => {
        state.loader = false;
        state.summaryData = defaultSummaryData;
        state.error = action.payload || responseMessage.somethingWentWrong;
      });
  },
});

export const {
  resetState,
  setApplicationFormSummaryActiveMenu,
  setApplicationFormSummaryBarChartColor,
  setClassLevelSummaryActiveMenu,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
