import { createAsyncThunk } from "@reduxjs/toolkit";

import _ from "lodash";

import { axiosInstance, apiResponseHaveData } from "@MEUtils/axiosInstance";
import {
  admissionApplicationsAPIRoute,
  schoolAcademicClassesAPIRoute,
} from "@MEUtils/apiRoutes";
import {
  admissionApplicationsAPIResponse,
  eductionBoardsWithAcademicClassesAPIResponse,
} from "@MEUtils/apiResponse";

const getAdmissionApplications = createAsyncThunk(
  "admission/getAdmissionApplications",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        payload
          ? `${admissionApplicationsAPIRoute}?${payload}`
          : admissionApplicationsAPIRoute,
        { state: getState() }
      );

      if (apiResponseHaveData(response)) {
        return {
          admissionApplications: admissionApplicationsAPIResponse(
            response.data
          ),
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

const getAcademicClasses = createAsyncThunk(
  "admission/getAcademicClasses",
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

export { getAdmissionApplications, getAcademicClasses };
