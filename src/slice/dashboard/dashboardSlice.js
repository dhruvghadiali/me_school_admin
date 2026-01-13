import { createSlice } from "@reduxjs/toolkit";
import { getDashboardSummary } from "@/slice/dashboard/dashboardAction";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    dashboardSummaryLoader: false,
    dashboardSummary: {},
    dashboardSummaryError: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardSummary.pending, (state, _) => {
        state.dashboardSummaryError = "";
        state.dashboardSummaryLoader = true;
        state.dashboardSummary = {};
      })
      .addCase(getDashboardSummary.fulfilled, (state, action) => {
        state.dashboardSummaryLoader = false;
        state.dashboardSummaryError = action.payload.error;
        state.dashboardSummary = action.payload.dashboardSummary;
      })
      .addCase(getDashboardSummary.rejected, (state, action) => {
        state.dashboardSummaryLoader = false;
        state.dashboardSummaryError = action.payload.error;
        state.dashboardSummary = action.payload.dashboardSummary;
      });
  },
});

export const {} = dashboardSlice.actions;

export default dashboardSlice.reducer;
