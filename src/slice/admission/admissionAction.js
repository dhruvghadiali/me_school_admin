import { createAsyncThunk } from "@reduxjs/toolkit";

import _ from "lodash";

import { admissionApplicationsAPIRoute } from "@MEUtils/apiRoutes";
import { admissionApplicationsAPIResponse } from "@MEUtils/apiResponse";
import { axiosInstance, apiResponseHaveData } from "@MEUtils/axiosInstance";

const getAdmissionApplications = createAsyncThunk(
  "admission/getAdmissionApplications",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        admissionApplicationsAPIRoute,
        { state: getState() }
      );

      if (apiResponseHaveData(response)) {
        return {
          admissionApplications: admissionApplicationsAPIResponse(response.data),
          error: "",
        };
      } else {
        return {
          admissionApplications: [],
          error:
            response && response.message
              ? response.message
              : "Admission application request failed",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Admission application request failed";
      return rejectWithValue({
        error: errMsg,
      });
    }
  }
);

export { getAdmissionApplications };