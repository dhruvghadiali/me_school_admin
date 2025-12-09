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
  axiosInstance,
  apiResponseHaveData,
  isAPIServedSuccessfully,
} from "@MEUtils/axiosInstance";

import _ from "lodash";

const getAcademicClasses = createAsyncThunk(
  "fee/getAcademicClasses",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      let school = "";
      let eductionBoardsWithAcademicClasses = [];
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
            `${schoolAcademicClassesAPIRoute}/${school}`,
            { state: getState() }
          );

          if (apiResponseHaveData(response)) {
            return {
              eductionBoardsWithAcademicClasses:
                eductionBoardsWithAcademicClassesAPIResponse(response.data),
              error: "",
            };
          } else {
            return {
              eductionBoardsWithAcademicClasses,
              error:
                response && response.message
                  ? response.message
                  : "No academic classes found",
            };
          }
        } else {
          return {
            eductionBoardsWithAcademicClasses,
            error: "No school or education boards found for the user",
          };
        }
      } else {
        return {
          eductionBoardsWithAcademicClasses,
          error: "No authenticated user found",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Get academic classes request failed";
      return rejectWithValue({ error: errMsg });
    }
  }
);

const getFeeTypes = createAsyncThunk(
  "fee/getFeeTypes",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      let feeTypes = [];
      const response = await axiosInstance.get(`${feeTypesAPIRoute}`, {
        state: getState(),
      });

      if (apiResponseHaveData(response)) {
        return {
          feeTypes: feeTypesAPIResponse(response.data),
          error: "",
        };
      } else {
        return {
          feeTypes,
          error:
            response && response.message
              ? response.message
              : "No fee types found",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Get fee types request failed";
      return rejectWithValue({ error: errMsg });
    }
  }
);

const getFees = createAsyncThunk(
  "fee/getFees",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      let fees = [];
      const response = await axiosInstance.get(
        `${feesAPIRoute}/${payload.academicClass}`,
        { state: getState() }
      );

      if (apiResponseHaveData(response)) {
        return {
          fees: feesAPIResponse(response.data),
          error: "",
        };
      } else {
        return {
          fees,
          error:
            response && response.message ? response.message : "No fees found",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) || "Get fees request failed";
      return rejectWithValue({ error: errMsg });
    }
  }
);

const addFee = createAsyncThunk(
  "fee/addFee",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    // try {
    //   const axiosInstanceConfig = setUpAxiosInstanceConfig(
    //     getState(),
    //     dispatch
    //   );
    //   const response = await axiosInstance.post(
    //     `${feesAPIRoute}`,
    //     payload,
    //     axiosInstanceConfig
    //   );
    //   if (response && response.data && response.data.length > 0) {
    //     dispatch(getFees({ academicClass: payload.school_academic_class }));
    //     return {
    //       error: "",
    //     };
    //   } else {
    //     return {
    //       error: response && response.message ? response.message : "",
    //     };
    //   }
    // } catch (error) {
    //   return rejectWithValue({
    //     error: error && error.message ? error.message : "",
    //   });
    // }
  }
);

const updateFee = createAsyncThunk(
  "fee/updateFee",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    // try {
    //   const axiosInstanceConfig = setUpAxiosInstanceConfig(
    //     getState(),
    //     dispatch
    //   );
    //   const response = await axiosInstance.put(
    //     `${feesAPIRoute}/${payload.id}`,
    //     payload.data,
    //     axiosInstanceConfig
    //   );
    //   if (response && response.data && response.data.length > 0) {
    //     dispatch(
    //       getFees({ academicClass: payload.data.school_academic_class })
    //     );
    //     return {
    //       error: "",
    //     };
    //   } else {
    //     return {
    //       error: response && response.message ? response.message : "",
    //     };
    //   }
    // } catch (error) {
    //   return rejectWithValue({
    //     error: error && error.message ? error.message : "",
    //   });
    // }
  }
);

const deleteFee = createAsyncThunk(
  "fee/deleteFee",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    // try {
    //   const axiosInstanceConfig = setUpAxiosInstanceConfig(
    //     getState(),
    //     dispatch
    //   );
    //   await axiosInstance.delete(
    //     `${feesAPIRoute}/${payload.id}`,
    //     axiosInstanceConfig
    //   );
    //   dispatch(getFees({ academicClass: payload.academicClass }));
    //   return {
    //     error: "",
    //   };
    // } catch (error) {
    //   return rejectWithValue({
    //     error: error && error.message ? error.message : "",
    //   });
    // }
  }
);

export {
  addFee,
  getFees,
  getFeeTypes,
  getAcademicClasses,
  updateFee,
  deleteFee,
};
