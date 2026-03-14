import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  feesAPIResponse,
  feeTypesAPIResponse,
  eductionBoardsWithAcademicClassesAPIResponse,
} from "@MEUtils/apiResponse";
import { schoolAboutAPIRoute } from "@MEUtils/apiRoutes";
import {
  axiosInstance,
  apiResponseHaveData,
  isAPIServedSuccessfully,
} from "@MEUtils/axiosInstance";
import { setAuthData } from "@MEHelpers/authHelpers";

import _ from "lodash";

import { setLogin } from "@MERedux/authentication/authenticationSlice";

const updateSchoolAbout = createAsyncThunk(
  "profile/updateSchoolAbout",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const { id, data } = payload;
      const response = await axiosInstance.put(
        `${schoolAboutAPIRoute}/${id}`,
        data,
        {
          state: getState(),
        },
      );

      if (apiResponseHaveData(response)) {
        const about = _.get(response, "data[0].about", "");
        const { authentication } = getState();
        const updatedUser = _.set(
          _.cloneDeep(authentication.user),
          "school.about",
          about,
        );

        dispatch(
          setLogin({ user: updatedUser, token: authentication.token }),
        );
        setAuthData(updatedUser, authentication.token);

        return {
          error: "",
        };
      } else {
        return {
          error:
            response && response.message
              ? response.message
              : "Failed to update school about information",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) || "Failed to update school about information";
      return rejectWithValue({ error: errMsg });
    }
  },
);

export { updateSchoolAbout };
