import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  changeUsernameAPIRoute,
  changePasswordAPIRoute,
} from "@MEUtils/apiRoutes";
import {
  axiosInstance,
  isAPIServedSuccessfully,
} from "@MEUtils/axiosInstance";

import _ from "lodash";

const changeUsername = createAsyncThunk(
  "setting/changeUsername",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        changeUsernameAPIRoute,
        payload,
        {
          state: getState(),
        },
      );

      if (isAPIServedSuccessfully(response)) {
        return {
          error: "",
        };
      } else {
        return {
          error:
            response && response.message
              ? response.message
              : "Failed to change username",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Failed to change username";
      return rejectWithValue({ error: errMsg });
    }
  },
);

const changePassword = createAsyncThunk(
  "setting/changePassword",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        changePasswordAPIRoute,
        payload,
        {
          state: getState(),
        },
      );

      if (isAPIServedSuccessfully(response)) {
        return {
          error: "",
        };
      } else {
        return {
          error:
            response && response.message
              ? response.message
              : "Failed to change password",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Failed to change password";
      return rejectWithValue({ error: errMsg });
    }
  },
);

export { changeUsername, changePassword };
