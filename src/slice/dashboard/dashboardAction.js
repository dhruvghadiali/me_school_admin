import { createAsyncThunk } from "@reduxjs/toolkit";

import _ from "lodash";

import { admissionApplicationSummaryAPIRoute } from "@MEUtils/apiRoutes";
import { axiosInstance, apiResponseHaveData } from "@MEUtils/axiosInstance";
import { dashboardSummaryAPIResponse } from "@MEUtils/apiResponse";

const getDashboardSummary = createAsyncThunk(
  "dashboard/getDashboardSummary",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.get(
        admissionApplicationSummaryAPIRoute,
        { state: getState() }
      );

      console.log("Dashboard Summary Response:", response); 

      if (apiResponseHaveData(response)) {
        return {
          dashboardSummary: dashboardSummaryAPIResponse(response.data[0]),
          error: "",
        };
      } else {
        return {
          dashboardSummary: dashboardSummaryAPIResponse({}),
          error:
            response && response.message
              ? response.message
              : "Dashboard summary request failed",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "GDashboard summary request failed";
      return rejectWithValue({
        error: errMsg,
        dashboardSummary: dashboardSummaryAPIResponse({}),
      });
    }
  }
);

export { getDashboardSummary };
