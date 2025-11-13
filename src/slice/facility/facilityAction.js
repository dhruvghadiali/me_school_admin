import { createAsyncThunk } from "@reduxjs/toolkit";

import { setUpAxiosInstanceConfig } from "@MEUtils/utilityFunctions";
import { setSelectedFacilityType } from "@MERedux/facility/facilitySlice";
import { facilityTypesAPIRoute, facilityAPIRoute } from "@MEUtils/apiRoutes";

import {
  facilityTypesAPIResponse,
  facilitiesAPIResponse,
} from "@MEUtils/apiResponse";

import _ from "lodash";

import axiosInstance from "@MEUtils/axiosInstance";

const getFacilityTypes = createAsyncThunk(
  "fee/getFacilityTypes",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const axiosInstanceConfig = setUpAxiosInstanceConfig(
        getState(),
        dispatch
      );

      const response = await axiosInstance.get(
        `${facilityTypesAPIRoute}`,
        axiosInstanceConfig
      );

      if (response && response.data && response.data.length > 0) {
        dispatch(getFacilities(response.data));

        let facilityTypes = facilityTypesAPIResponse(response.data);

        if (
          getState() &&
          getState().facility &&
          !getState().facility.selectedFacilityType &&
          facilityTypes &&
          facilityTypes.length > 0
        ) {
          dispatch(setSelectedFacilityType(facilityTypes[0].value));
        }

        return {
          facilityTypes: facilityTypes,
        };
      } else {
        return {
          facilityTypes: [],
        };
      }
    } catch (error) {
      return rejectWithValue({
        facilityTypes: [],
      });
    }
  }
);

const getFacilities = createAsyncThunk(
  "fee/getFacilities",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      let school;
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
        `${facilityAPIRoute}/${school}`,
        axiosInstanceConfig
      );

      if (response && response.data && response.data.length > 0) {
        return {
          facilities: facilitiesAPIResponse(payload, response.data),
          error: "",
        };
      } else {
        return {
          facilities: facilitiesAPIResponse(payload, []),
          error: response && response.message ? response.message : "",
        };
      }
    } catch (error) {
      return rejectWithValue({
        facilities: facilitiesAPIResponse(payload, []),
        error: error && error.message ? error.message : "",
      });
    }
  }
);

const addFacility = createAsyncThunk(
  "fee/addFacility",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
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
        payload = {
          ...payload,
          school: getState().authentication.user.school.id,
        };
      }

      const response = await axiosInstance.post(
        facilityAPIRoute,
        payload,
        axiosInstanceConfig,
      );

      if (response && response.data && response.data.length > 0) {
        dispatch(getFacilityTypes());
        return {};
      } else {
        return {};
      }
    } catch (error) {
      return rejectWithValue({});
    }
  }
);

const deleteFacility = createAsyncThunk(
  "fee/deleteFacility",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const axiosInstanceConfig = setUpAxiosInstanceConfig(
        getState(),
        dispatch
      );

      const response = await axiosInstance.delete(
        `${facilityAPIRoute}/${payload}`,
        axiosInstanceConfig,
      );

      if (response && response.data) {
        dispatch(getFacilityTypes());
        return {};
      } else {
        return {};
      }
    } catch (error) {
      return rejectWithValue({});
    }
  }
);

export { getFacilityTypes, getFacilities, addFacility, deleteFacility };
