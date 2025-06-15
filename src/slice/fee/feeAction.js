import { createAsyncThunk } from "@reduxjs/toolkit";

import { eductionBoardsWithAcademicClassesAPIResponse } from "@MEUtils/apiResponse";
import {
  feesAPIRoute,
  schoolAcademicClassesAPIRoute,
} from "@MEUtils/apiRoutes";
import {
  defaultAPIErrorResponse,
  setUpAxiosInstanceConfig,
} from "@MEUtils/utilityFunctions";

import _ from "lodash";

import axiosInstance from "@MEUtils/axiosInstance";

const getAcademicClasses = createAsyncThunk(
  "fee/getAcademicClasses",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      let school = "";
      const axiosInstanceConfig = setUpAxiosInstanceConfig(
        getState(),
        dispatch
      );

      if (
        getState() &&
        getState().authentication &&
        getState().authentication.user &&
        getState().authentication.user.school &&
        getState().authentication.user.school.id
      ) {
        school = getState().authentication.user.school.id;
        console.log("school", school);
      }

      const response = await axiosInstance.get(
        `${schoolAcademicClassesAPIRoute}/${school}`,
        axiosInstanceConfig
      );

      if (response && response.data && response.data.length > 0) {
        return {
          eductionBoardsWithAcademicClasses: eductionBoardsWithAcademicClassesAPIResponse(response.data),
          error: "",
        };
      } else {
        return {
          eductionBoardsWithAcademicClasses: [],
          error: response && response.message ? response.message : "",
        };
      }
    } catch (error) {
      return rejectWithValue({
        error: error && error.message ? error.message : "",
      });
    }
  }
);

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

export { addFee, getAcademicClasses };
