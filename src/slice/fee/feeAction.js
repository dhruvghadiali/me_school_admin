import { createAsyncThunk } from "@reduxjs/toolkit";

import {
} from "@MEUtils/apiResponse";
import {
  feesAPIRoute
} from "@MEUtils/apiRoutes";
import {
  defaultAPIErrorResponse,
  setUpAxiosInstanceConfig,
} from "@MEUtils/utilityFunctions";

import _ from "lodash";

import axiosInstance from "@MEUtils/axiosInstance";

const addFee = createAsyncThunk(
  "fee/addFee",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const axiosInstanceConfig = setUpAxiosInstanceConfig(
        getState(),
        dispatch
      );

      const response = await axiosInstance.post(
        `${feesAPIRoute}`,
        payload,
        axiosInstanceConfig
      );

      console.log("response", response);
      // if (response && response.data && response.data.length > 0) {
      //   dispatch(getAcademicClasses());
      //   return {
      //     error:"",
      //   };
      // } else {
      //   return {
      //     error:
      //       response && response.message ? response.message : "",
      //   };
      // }

      return {
        error: "",
      };
    } catch (error) {
      return rejectWithValue({
        error: error && error.message ? error.message : "",
      });
    }
  }
);

export {
  addFee,
};
