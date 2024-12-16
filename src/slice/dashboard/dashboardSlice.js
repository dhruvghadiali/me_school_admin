import { createSlice } from "@reduxjs/toolkit";
import { summary } from "./dashboardAction";
import { responseMessage } from "../../utils/responseMessage";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    summaryData: [],
    loader: false,
    error: "",
  },
  reducers: {
    resetState: (state, _) => {
      state.loader = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(summary.pending, (state, _) => {
        state.loader = true;
        state.error = "";
      })
      .addCase(summary.fulfilled, (state, action) => {
        state.loader = false;
        state.error = "";
        state.summaryData = action.payload;
      })
      .addCase(summary.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload || responseMessage.somethingWentWrong;
      });
  },
});

export const { resetState } = dashboardSlice.actions;

export default dashboardSlice.reducer;
