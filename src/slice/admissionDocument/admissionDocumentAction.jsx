import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  admissionDocumentsAPIRoute,
  schoolAcademicClassesAPIRoute,
  schoolAdmissionDocumentsAPIRoute,
} from "@MEUtils/apiRoutes";
import {
  admissionDocumentsAPIResponse,
  schoolAdmissionDocumentsAPIResponse,
  eductionBoardsWithAcademicClassesAPIResponse,
} from "@MEUtils/apiResponse";
import {
  axiosInstance,
  apiResponseHaveData,
  isAPIServedSuccessfully,
} from "@MEUtils/axiosInstance";

import _ from "lodash";

const getAcademicClasses = createAsyncThunk(
  "admissionDocument/getAcademicClasses",
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

const getAdmissionDocuments = createAsyncThunk(
  "admissionDocument/getAdmissionDocuments",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      let admissionDocuments = [];
      const response = await axiosInstance.get(
        `${admissionDocumentsAPIRoute}`,
        { state: getState() }
      );

      if (apiResponseHaveData(response)) {
        return {
          admissionDocuments: admissionDocumentsAPIResponse(response.data),
          error: "",
        };
      } else {
        return {
          admissionDocuments,
          error:
            response && response.message
              ? response.message
              : "No admission documents found",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Get admission documents request failed";
      return rejectWithValue({ error: errMsg });
    }
  }
);

const getSchoolAdmissionDocuments = createAsyncThunk(
  "admissionDocument/getSchoolAdmissionDocuments",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      let schoolAdmissionDocuments = [];
      const response = await axiosInstance.get(
        `${schoolAdmissionDocumentsAPIRoute}/${payload.academicClass}`,
        { state: getState() }
      );

      if (apiResponseHaveData(response)) {
        return {
          schoolAdmissionDocuments: schoolAdmissionDocumentsAPIResponse(
            response.data
          ),
          error: "",
        };
      } else {
        return {
          schoolAdmissionDocuments,
          error:
            response && response.message
              ? response.message
              : "No school admission documents found",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Get school admission documents request failed";
      return rejectWithValue({ error: errMsg });
    }
  }
);

const addAdmissionDocument = createAsyncThunk(
  "admissionDocument/addAdmissionDocument",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post(
        `${schoolAdmissionDocumentsAPIRoute}`,
        payload,
        { state: getState() }
      );

      if (apiResponseHaveData(response)) {
        dispatch(
          getSchoolAdmissionDocuments({
            academicClass: payload.school_academic_class,
          })
        );
        return {
          error: "",
        };
      } else {
        return {
          error:
            response && response.message
              ? response.message
              : "Fail to add admission document",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Fail to add admission document";
      return rejectWithValue({ error: errMsg });
    }
  }
);

const updateAdmissionDocument = createAsyncThunk(
  "admissionDocument/updateAdmissionDocument",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.put(
        `${schoolAdmissionDocumentsAPIRoute}/${payload.id}`,
        payload.data,
        { state: getState() }
      );

      if (apiResponseHaveData(response)) {
        dispatch(
          getSchoolAdmissionDocuments({
            academicClass: payload.data.school_academic_class,
          })
        );
        return {
          error: "",
        };
      } else {
        return {
          error:
            response && response.message
              ? response.message
              : "Fail to update admission document",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Fail to update admission document";
      return rejectWithValue({ error: errMsg });
    }
  }
);

const deleteAdmissionDocument = createAsyncThunk(
  "admissionDocument/deleteAdmissionDocument",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.delete(
        `${schoolAdmissionDocumentsAPIRoute}/${payload.id}`,
        { state: getState() }
      );

      if (isAPIServedSuccessfully(response)) {
        dispatch(
          getSchoolAdmissionDocuments({
            academicClass: payload.academicClass,
          })
        );
        return {
          error: "",
        };
      } else {
        return {
          error:
            response && response.message
              ? response.message
              : "Fail to delete admission document",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Fail to delete admission document";
      return rejectWithValue({ error: errMsg });
    }
  }
);

export {
  getAcademicClasses,
  addAdmissionDocument,
  getAdmissionDocuments,
  deleteAdmissionDocument,
  updateAdmissionDocument,
  getSchoolAdmissionDocuments,
};
