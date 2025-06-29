import { createAsyncThunk } from "@reduxjs/toolkit";

import { setUpAxiosInstanceConfig } from "@MEUtils/utilityFunctions";
import {
  schoolAcademicClassesAPIRoute,
  admissionDocumentsAPIRoute,
} from "@MEUtils/apiRoutes";
import {
  eductionBoardsWithAcademicClassesAPIResponse,
  admissionDocumentAPIResponse,
} from "@MEUtils/apiResponse";

import _ from "lodash";

import axiosInstance from "@MEUtils/axiosInstance";

const getAcademicClasses = createAsyncThunk(
  "admissionDocument/getAcademicClasses",
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

const getAdmissionDocuments = createAsyncThunk(
  "admissionDocument/getAdmissionDocuments",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const axiosInstanceConfig = setUpAxiosInstanceConfig(
        getState(),
        dispatch
      );

      const response = await axiosInstance.get(
        admissionDocumentsAPIRoute,
        axiosInstanceConfig
      );

      if (response && response.data && response.data.length > 0) {
        return {
          error: "",
          admissionDocuments: _.map(response.data, (data) => {
            return admissionDocumentAPIResponse(data);
          }),
        };
      } else {
        return {
          error: response && response.message ? response.message : "",
          admissionDocuments: [],
        };
      }
    } catch (error) {
      return rejectWithValue({
        error: error && error.message ? error.message : "",
        admissionDocuments: [],
      });
    }
  }
);

export { getAcademicClasses, getAdmissionDocuments };
