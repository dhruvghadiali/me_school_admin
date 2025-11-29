import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  academicClassAPIResponse,
  schoolAcademicClassAPIResponse,
} from "@MEUtils/apiResponse";
import {
  academicClassesAPIRoute,
  schoolAcademicClassesAPIRoute,
} from "@MEUtils/apiRoutes";
// import {
//   defaultAPIErrorResponse,
//   setUpAxiosInstanceConfig,
// } from "@MEUtils/utilityFunctions";

import _ from "lodash";

import { axiosInstance, apiResponseHaveData } from "@MEUtils/axiosInstance";

// const setUpAcademicClassStateValue = (authentication, academicClass) => {
//   if (
//     academicClass &&
//     authentication &&
//     authentication.user &&
//     authentication.user.school &&
//     authentication.user.school.id &&
//     authentication.user.school.educationBoards &&
//     authentication.user.school.educationBoards.length > 0
//   ) {
//     let school = authentication.user.school;
//     let selectedEducationBoard = academicClass.selectedEducationBoard
//       ? academicClass.selectedEducationBoard
//       : "";

//     if (selectedEducationBoard) {
//       selectedEducationBoard = selectedEducationBoard =
//         _.findIndex(
//           school.educationBoards,
//           (educationBoard) => educationBoard.id === selectedEducationBoard
//         ) === -1
//           ? school.educationBoards[0].id
//           : selectedEducationBoard;
//     } else {
//       selectedEducationBoard = school.educationBoards[0].id;
//     }

//     let educationBoards = school.educationBoards.map((educationBoard) => ({
//       label: educationBoard.educationBoard,
//       value: educationBoard.id,
//     }));

//     return {
//       school: school.id,
//       educationBoards: educationBoards,
//       selectedEducationBoard: selectedEducationBoard,
//     };
//   } else {
//     return {
//       school: "",
//       selectedEducationBoard: "",
//       educationBoards: [],
//     };
//   }
// };

// const getAcademicClassesInfo = async ({
//   school,
//   selectedEducationBoard,
//   axiosInstanceConfig,
// }) => {
//   try {
//     const response = await axiosInstance.get(
//       `${schoolAcademicClassesAPIRoute}/${school}/${selectedEducationBoard}`,
//       axiosInstanceConfig
//     );

//     if (response && response.data && response.data.length > 0) {
//       return {
//         academicClassError:
//           response && response.message ? response.message : "",
//         academicClasses: _.sortBy(_.map(response.data, (academicClass) =>
//           schoolAcademicClassAPIResponse(academicClass)
//         ),['academicClass']),
//       };
//     } else {
//       return {
//         academicClassError:
//           response && response.message ? response.message : "",
//         academicClasses: [],
//       };
//     }
//   } catch (error) {
//     return {
//       academicClassError: error && error.message ? error.message : "",
//       academicClasses: [],
//     };
//   }
// };

const getAcademicClasses = createAsyncThunk(
  "academicClass/getAcademicClasses",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      console.log("getAcademicClasses thunk called", getState());

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
          selectedEducationBoard = user.school.educationBoards[0].id;

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

// const onChangeEductionBoard = createAsyncThunk(
//   "academicClass/onChangeEductionBoard",
//   async (payload, { getState, rejectWithValue, dispatch }) => {
//     try {
//       const axiosInstanceConfig = setUpAxiosInstanceConfig(
//         getState(),
//         dispatch
//       );
//       const state = getState();
//       const academicClass = state.academicClass;

//       let response = await getAcademicClassesInfo({
//         school: academicClass.school,
//         selectedEducationBoard: payload,
//         axiosInstanceConfig: axiosInstanceConfig,
//       });

//       return {
//         ...response,
//         selectedEducationBoard: payload,
//       };
//     } catch (error) {
//       return rejectWithValue({
//         error: defaultAPIErrorResponse.message,
//         academicClasses: [],
//         selectedEducationBoard: "",
//       });
//     }
//   }
// );

const getDefaultAcademicClasses = createAsyncThunk(
  "academicClass/getDefaultAcademicClasses",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      console.log("getDefaultAcademicClasses thunk called", getState());

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
      console.log("getDefaultAcademicClasses thunk called", getState());

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

// const deleteAcademicClasses = createAsyncThunk(
//   "academicClass/deleteAcademicClasses",
//   async (payload, { getState, rejectWithValue, dispatch }) => {
//     try {
//       const axiosInstanceConfig = setUpAxiosInstanceConfig(
//         getState(),
//         dispatch
//       );

//       await axiosInstance.delete(
//         `${schoolAcademicClassesAPIRoute}/${payload}`,
//         axiosInstanceConfig
//       );

//       dispatch(getAcademicClasses());
//       return {
//         error: "",
//       };
//     } catch (error) {
//       return rejectWithValue({
//         error: error && error.message ? error.message : "",
//       });
//     }
//   }
// );

export {
  addAcademicClasses,
  getAcademicClasses,
  // onChangeEductionBoard,
  // deleteAcademicClasses,
  getDefaultAcademicClasses,
};
