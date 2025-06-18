import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  academicClassAPIResponse,
  schoolAcademicClassAPIResponse,
} from "@MEUtils/apiResponse";
import {
  academicClassesAPIRoute,
  schoolAcademicClassesAPIRoute,
} from "@MEUtils/apiRoutes";
import {
  defaultAPIErrorResponse,
  setUpAxiosInstanceConfig,
} from "@MEUtils/utilityFunctions";

import _ from "lodash";

import axiosInstance from "@MEUtils/axiosInstance";


const setUpAcademicClassStateValue = (authentication, academicClass) => {
  if (
    academicClass &&
    authentication &&
    authentication.user &&
    authentication.user.school &&
    authentication.user.school.id &&
    authentication.user.school.educationBoards &&
    authentication.user.school.educationBoards.length > 0
  ) {
    let school = authentication.user.school;
    let selectedEducationBoard = academicClass.selectedEducationBoard
      ? academicClass.selectedEducationBoard
      : "";

    if (selectedEducationBoard) {
      selectedEducationBoard = selectedEducationBoard =
        _.findIndex(
          school.educationBoards,
          (educationBoard) => educationBoard.id === selectedEducationBoard
        ) == -1
          ? school.educationBoards[0].id
          : selectedEducationBoard;
    } else {
      selectedEducationBoard = school.educationBoards[0].id;
    }

    let educationBoards = school.educationBoards.map((educationBoard) => ({
      label: educationBoard.educationBoard,
      value: educationBoard.id,
    }));

    return {
      school: school.id,
      educationBoards: educationBoards,
      selectedEducationBoard: selectedEducationBoard,
    };
  } else {
    return {
      school: "",
      selectedEducationBoard: "",
      educationBoards: [],
    };
  }
};

const getAcademicClassesInfo = async ({
  school,
  selectedEducationBoard,
  axiosInstanceConfig,
}) => {
  try {
    const response = await axiosInstance.get(
      `${schoolAcademicClassesAPIRoute}/${school}/${selectedEducationBoard}`,
      axiosInstanceConfig
    );

    if (response && response.data && response.data.length > 0) {
      return {
        academicClassError:
          response && response.message ? response.message : "",
        academicClasses: _.sortBy(_.map(response.data, (academicClass) =>
          schoolAcademicClassAPIResponse(academicClass)
        ),['academicClass']),
      };
    } else {
      return {
        academicClassError:
          response && response.message ? response.message : "",
        academicClasses: [],
      };
    }
  } catch (error) {
    return {
      academicClassError: error && error.message ? error.message : "",
      academicClasses: [],
    };
  }
};

const getAcademicClasses = createAsyncThunk(
  "academicClass/getAcademicClasses",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const axiosInstanceConfig = setUpAxiosInstanceConfig(
        getState(),
        dispatch
      );
      const state = getState();
      const authentication = state.authentication;
      const academicClass = state.academicClass;

      let stateValues = setUpAcademicClassStateValue(
        authentication,
        academicClass
      );

      let response = await getAcademicClassesInfo({
        school: stateValues.school,
        selectedEducationBoard: stateValues.selectedEducationBoard,
        axiosInstanceConfig: axiosInstanceConfig,
      });

      return {
        ...stateValues,
        ...response,
      };
    } catch (error) {
      return rejectWithValue({
        error: defaultAPIErrorResponse.message,
        school: "",
        selectedEducationBoard: "",
        academicClasses: [],
        educationBoards: [],
      });
    }
  }
);

const onChangeEductionBoard = createAsyncThunk(
  "academicClass/onChangeEductionBoard",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const axiosInstanceConfig = setUpAxiosInstanceConfig(
        getState(),
        dispatch
      );
      const state = getState();
      const academicClass = state.academicClass;

      let response = await getAcademicClassesInfo({
        school: academicClass.school,
        selectedEducationBoard: payload,
        axiosInstanceConfig: axiosInstanceConfig,
      });

      return {
        ...response,
        selectedEducationBoard: payload,
      };
    } catch (error) {
      return rejectWithValue({
        error: defaultAPIErrorResponse.message,
        academicClasses: [],
        selectedEducationBoard: "",
      });
    }
  }
);

const getDefaultAcademicClasses = createAsyncThunk(
  "academicClass/getDefaultAcademicClasses",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const axiosInstanceConfig = setUpAxiosInstanceConfig(
        getState(),
        dispatch
      );

      const response = await axiosInstance.get(
        `${academicClassesAPIRoute}`,
        axiosInstanceConfig
      );

      if (response && response.data && response.data.length > 0) {
        return {
          error: response && response.message ? response.message : "",
          defaultAcademicClasses: response.data.map((academicClass) => {
            let academicClassInfo = academicClassAPIResponse(academicClass);
            return {
              label: academicClassInfo.academicClass,
              value: academicClassInfo.id,
            };
          }),
        };
      } else {
        return {
          error: response && response.message ? response.message : "",
          defaultAcademicClasses: [],
        };
      }
    } catch (error) {
      return rejectWithValue({
        error: error && error.message ? error.message : "",
        defaultAcademicClasses: [],
      });
    }
  }
);

const addAcademicClasses = createAsyncThunk(
  "academicClass/addAcademicClasses",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const axiosInstanceConfig = setUpAxiosInstanceConfig(
        getState(),
        dispatch
      );

      const response = await axiosInstance.post(
        `${schoolAcademicClassesAPIRoute}`,
        payload,
        axiosInstanceConfig
      );

      if (response && response.data && response.data.length > 0) {
        dispatch(getAcademicClasses());
        return {
          error:"",
        };
      } else {
        return {
          error:
            response && response.message ? response.message : "",
        };
      }
    } catch (error) {
      return rejectWithValue({
        error: error && error.message ? error.message : "",
      });
    }
  }
);

const deleteAcademicClasses = createAsyncThunk(
  "academicClass/deleteAcademicClasses",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const axiosInstanceConfig = setUpAxiosInstanceConfig(
        getState(),
        dispatch
      );

      await axiosInstance.delete(
        `${schoolAcademicClassesAPIRoute}/${payload}`,
        axiosInstanceConfig
      );

      dispatch(getAcademicClasses());
        return {
          error:"",
        };
    } catch (error) {
      return rejectWithValue({
        error: error && error.message ? error.message : "",
      });
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
