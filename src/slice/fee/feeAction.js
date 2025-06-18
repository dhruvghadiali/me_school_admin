import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  feesAPIResponse,
  feeTypesAPIResponse,
  eductionBoardsWithAcademicClassesAPIResponse,
} from "@MEUtils/apiResponse";
import {
  feesAPIRoute,
  feeTypesAPIRoute,
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
      }

      const response = await axiosInstance.get(
        `${schoolAcademicClassesAPIRoute}/${school}`,
        axiosInstanceConfig
      );

      if (response && response.data && response.data.length > 0) {
        return {
          eductionBoardsWithAcademicClasses:
            eductionBoardsWithAcademicClassesAPIResponse(response.data),
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

const getFeeTypes = createAsyncThunk(
  "fee/getFeeTypes",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const axiosInstanceConfig = setUpAxiosInstanceConfig(
        getState(),
        dispatch
      );

      const response = await axiosInstance.get(
        `${feeTypesAPIRoute}`,
        axiosInstanceConfig
      );

      if (response && response.data && response.data.length > 0) {
        return {
          feeTypes: _.map(response.data, (feeType) =>
            feeTypesAPIResponse(feeType)
          ),
        };
      } else {
        return {
          feeTypes: [],
        };
      }
    } catch (error) {
      return rejectWithValue({});
    }
  }
);

const getFees = createAsyncThunk(
  "fee/getFees",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const axiosInstanceConfig = setUpAxiosInstanceConfig(
        getState(),
        dispatch
      );

      const response = await axiosInstance.get(
        `${feesAPIRoute}/${payload.academicClass}`,
        axiosInstanceConfig
      );

      if (response && response.data && response.data.length > 0) {
        return {
          fees: _.map(response.data, (fee) => feesAPIResponse(fee)),
          error: "",
        };
      } else {
        return {
          fees: [],
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

      if (response && response.data && response.data.length > 0) {
        dispatch(getFees({ academicClass: payload.school_academic_class }));
        return {
          error: "",
        };
      } else {
        return {
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

export { addFee, getFees, getFeeTypes, getAcademicClasses };
