import { createAsyncThunk } from "@reduxjs/toolkit";

import { setSelectedFacilityType } from "@MERedux/facility/facilitySlice";
import { facilityTypesAPIRoute, facilityAPIRoute } from "@MEUtils/apiRoutes";
import {
  facilityTypesAPIResponse,
  facilitiesAPIResponse,
} from "@MEUtils/apiResponse";
import {
  axiosInstance,
  apiResponseHaveData,
  isAPIServedSuccessfully,
} from "@MEUtils/axiosInstance";

import _ from "lodash";

const getFacilityTypes = createAsyncThunk(
  "facility/getFacilityTypes",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      let facilityTypes = [];
      const response = await axiosInstance.get(`${facilityTypesAPIRoute}`, {
        state: getState(),
      });

      if (apiResponseHaveData(response)) {
        facilityTypes = facilityTypesAPIResponse(response.data);
        dispatch(getFacilities(response.data));
        // dispatch(setSelectedFacilityType(facilityTypes[0].value));
        return {
          facilityTypes,
          error: "",
        };
      } else {
        return {
          facilityTypes,
          error:
            response && response.message
              ? response.message
              : "No facility types found",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Get facility types request failed";
      return rejectWithValue({ error: errMsg });
    }
  }
);

const getFacilities = createAsyncThunk(
  "facility/getFacilities",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      let school = "";
      let facilities = [];
      if (
        getState() &&
        getState().authentication &&
        getState().authentication.user
      ) {
        let user = getState().authentication.user;

        if (
          user.school &&
          user.school.id &&
          user.school.educationBoards &&
          _.size(user.school.educationBoards) > 0
        ) {
          school = user.school.id;

          const response = await axiosInstance.get(
            `${facilityAPIRoute}/${school}`,
            { state: getState() }
          );

          if (apiResponseHaveData(response)) {
            return {
              facilities: facilitiesAPIResponse(payload, response.data),
              error: "",
            };
          } else {
            return {
              facilities: facilitiesAPIResponse(payload, []),
              error:
                response && response.message
                  ? response.message
                  : "No facilities found",
            };
          }
        } else {
          return {
            facilities,
            error: "No school or education boards found for the user",
          };
        }
      } else {
        return {
          facilities,
          error: "No authenticated user found",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Get facilities request failed";
      return rejectWithValue({ error: errMsg });
    }
  }
);

const addFacility = createAsyncThunk(
  "facility/addFacility",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      if (
        getState() &&
        getState().authentication &&
        getState().authentication.user
      ) {
        let user = getState().authentication.user;

        if (
          user.school &&
          user.school.id &&
          user.school.educationBoards &&
          _.size(user.school.educationBoards) > 0
        ) {
          let school = user.school.id;

          const response = await axiosInstance.post(
            `${facilityAPIRoute}`,
            { ...payload, school: school },
            {
              state: getState(),
            }
          );

          if (apiResponseHaveData(response)) {
            dispatch(getFacilityTypes());
            return {
              error: "",
            };
          } else {
            return {
              error:
                response && response.message
                  ? response.message
                  : "Add facility request failed",
            };
          }
        } else {
          return {
            facilities,
            error: "No school or education boards found for the user",
          };
        }
      } else {
        return {
          facilities,
          error: "No authenticated user found",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Add facility request failed";
      return rejectWithValue({ error: errMsg });
    }
  }
);

const deleteFacility = createAsyncThunk(
  "facility/deleteFacility",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.delete(
        `${facilityAPIRoute}/${payload}`,
        {
          state: getState(),
        }
      );

      if (isAPIServedSuccessfully(response)) {
        dispatch(getFacilityTypes());
        return {
          error: "",
        };
      } else {
        return {
          error:
            response && response.message
              ? response.message
              : "Delete facility request failed",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Delete facility request failed";
      return rejectWithValue({ error: errMsg });
    }
  }
);

export { getFacilityTypes, getFacilities, addFacility, deleteFacility };
