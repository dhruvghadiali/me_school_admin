import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  academicClassAPIResponse,
  schoolAcademicClassAPIResponse,
} from "@MEUtils/apiResponse";
import {
  academicClassesAPIRoute,
  schoolAcademicClassesAPIRoute,
} from "@MEUtils/apiRoutes";

import _ from "lodash";

import {
  axiosInstance,
  apiResponseHaveData,
  isAPIServedSuccessfully,
} from "@MEUtils/axiosInstance";

const getAcademicClasses = createAsyncThunk(
  "academicClass/getAcademicClasses",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      let school = "";
      let selectedEducationBoard = "";
      let academicClasses = [];
      let educationBoards = [];
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
          educationBoards = _.map(
            user.school.educationBoards,
            (educationBoard) => ({
              label: educationBoard.educationBoard,
              value: educationBoard.id,
            })
          );
          selectedEducationBoard =
            getState() &&
            getState().academicClass &&
            getState().academicClass.selectedEducationBoard
              ? getState().academicClass.selectedEducationBoard
              : user.school.educationBoards[0].id;

          const response = await axiosInstance.get(
            `${schoolAcademicClassesAPIRoute}/${school}/${selectedEducationBoard}`,
            { state: getState() }
          );

          if (apiResponseHaveData(response)) {
            return {
              academicClasses: _.sortBy(
                _.map(response.data, (academicClass) =>
                  schoolAcademicClassAPIResponse(academicClass)
                ),
                ["academicClass"]
              ),
              educationBoards,
              school,
              selectedEducationBoard,
              error: "",
            };
          } else {
            return {
              academicClasses,
              educationBoards,
              school,
              selectedEducationBoard,
              error:
                response && response.message
                  ? response.message
                  : "No academic classes found",
            };
          }
        } else {
          return {
            academicClasses,
            educationBoards,
            school,
            selectedEducationBoard,
            error: "No school or education boards found for the user",
          };
        }
      } else {
        return {
          academicClasses,
          educationBoards,
          school,
          selectedEducationBoard,
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

const onChangeEductionBoard = createAsyncThunk(
  "academicClass/onChangeEductionBoard",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      let school = "";
      let selectedEducationBoard = payload;
      let academicClasses = [];

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
            `${schoolAcademicClassesAPIRoute}/${school}/${selectedEducationBoard}`,
            { state: getState() }
          );

          if (apiResponseHaveData(response)) {
            return {
              academicClasses: _.sortBy(
                _.map(response.data, (academicClass) =>
                  schoolAcademicClassAPIResponse(academicClass)
                ),
                ["academicClass"]
              ),
              selectedEducationBoard,
              error: "",
            };
          } else {
            return {
              academicClasses,
              selectedEducationBoard,
              error:
                response && response.message
                  ? response.message
                  : "No academic classes found",
            };
          }
        } else {
          return {
            academicClasses,
            selectedEducationBoard,
            error: "No school or education boards found for the user",
          };
        }
      } else {
        return {
          academicClasses,
          selectedEducationBoard,
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

const getDefaultAcademicClasses = createAsyncThunk(
  "academicClass/getDefaultAcademicClasses",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.get(academicClassesAPIRoute, {
        state: getState(),
      });

      if (apiResponseHaveData(response)) {
        return {
          defaultAcademicClasses: _.map(response.data, (academicClass) => {
            let academicClassInfo = academicClassAPIResponse(academicClass);
            return {
              label: academicClassInfo.academicClass,
              value: academicClassInfo.id,
            };
          }),
          error: "",
        };
      } else {
        return {
          defaultAcademicClasses: [],
          error:
            response && response.message
              ? response.message
              : "No academic classes found",
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

const addAcademicClasses = createAsyncThunk(
  "academicClass/addAcademicClasses",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post(
        schoolAcademicClassesAPIRoute,
        payload,
        {
          state: getState(),
        }
      );

      if (apiResponseHaveData(response)) {
        dispatch(getAcademicClasses());

        return {
          error: "",
        };
      } else {
        return {
          error:
            response && response.message
              ? response.message
              : "academic class addition failed",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "academic class addition failed";
      return rejectWithValue({ error: errMsg });
    }
  }
);

const deleteAcademicClasses = createAsyncThunk(
  "academicClass/deleteAcademicClasses",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.delete(
        `${schoolAcademicClassesAPIRoute}/${payload}`,
        {
          state: getState(),
        }
      );

      if (isAPIServedSuccessfully(response)) {
        dispatch(getAcademicClasses());

        return {
          error: "",
        };
      } else {
        return {
          error:
            response && response.message
              ? response.message
              : "academic class deletion failed",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "academic class deletion failed";
      return rejectWithValue({ error: errMsg });
    }
  }
);

export {
  addAcademicClasses,
  getAcademicClasses,
  onChangeEductionBoard,
  deleteAcademicClasses,
  getDefaultAcademicClasses,
};
