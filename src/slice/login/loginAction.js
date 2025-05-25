import { createAsyncThunk } from "@reduxjs/toolkit";

import { signInAPIRoute } from "@MEUtils/apiRoutes";
import { signInAPIResponse } from "@MEUtils/apiResponse";
import {
  defaultAPIErrorResponse,
  isAPIServedSuccessfully,
} from "@MEUtils/utilityFunctions";

import axios from "axios";

export const validateUser = createAsyncThunk(
  "login/validateUser",
  async (payload, { rejectWithValue }) => {
    try {
      let response;
      let user = {};

      console.log("Base URL: ", process.env.REACT_APP_API_BASE_URL);
      console.log("payload: ", payload);
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
      return rejectWithValue(error.message);
    }
  }
);
