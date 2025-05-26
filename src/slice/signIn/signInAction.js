import { createAsyncThunk } from "@reduxjs/toolkit";

import { signInAPIRoute } from "@MEUtils/apiRoutes";
import { signInAPIResponse } from "@MEUtils/apiResponse";
import {
  defaultAPIErrorResponse,
  isAPIServedSuccessfully,
} from "@MEUtils/utilityFunctions";

import axios from "axios";

export const validateUser = createAsyncThunk(
  "signIn/validateUser",
  async (payload, { rejectWithValue }) => {
    try {
      let response;
      let user = {};

      response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}${signInAPIRoute}`,
        payload
      );

      if (response) response = response.data;

      if (isAPIServedSuccessfully(response)) {
        if (response && response.data && response.data.length > 0) {
          user = signInAPIResponse(response.data[0]);
          if (user.isAccountVerified && user.isActive) {
            localStorage.setItem("user", JSON.stringify(user));
            return {
              error: "",
              user: user,
              isValidUser: true,
            };
          } else {
            return {
              error: "",
              user: {},
              isValidUser: false,
            };
          }
        } else {
          return {
            user: user,
            isValidUser: false,
            error: response.message || defaultAPIErrorResponse.message,
          };
        }
      } else {
        return {
          user: user,
          isValidUser: false,
          error: response.message || defaultAPIErrorResponse.message,
        };
      }
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {

        return rejectWithValue({ error: error.response.data.message });
      }
      return rejectWithValue({ error: error.message || defaultAPIErrorResponse.message });
    }
  }
);
