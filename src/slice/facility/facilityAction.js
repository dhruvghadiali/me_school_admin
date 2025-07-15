import { createAsyncThunk } from "@reduxjs/toolkit";

import { setSelectedFacilityType } from "@MERedux/facility/facilitySlice";
import { facilityTypesAPIRoute } from "@MEUtils/apiRoutes";
import { facilityTypesAPIResponse } from "@MEUtils/apiResponse";
import { setUpAxiosInstanceConfig } from "@MEUtils/utilityFunctions";

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
        let facilityTypes = facilityTypesAPIResponse(response.data);

        if(!getState().facility.selectedFacilityType && facilityTypes && facilityTypes.length > 0) {
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

export { getFacilityTypes };
