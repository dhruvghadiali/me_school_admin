import { createAsyncThunk } from "@reduxjs/toolkit";

import { signInAPIRoute } from "@MEUtils/apiRoutes";
import { setAuthData } from "@MEHelpers/authHelpers";
import { setUserInformation } from "@MEUtils/apiResponse";
import { axiosInstance, apiResponseHaveData } from "@MEUtils/axiosInstance";

const signIn = createAsyncThunk(
  "authentication/signIn",
  async (payload, { rejectWithValue }) => {
    try {
      // Use the pre-configured axios instance (baseURL + timeout + headers)
      const response = await axiosInstance.post(signInAPIRoute, payload, {
        autoLogoutOnUnauthorized: false,
      });

      if (apiResponseHaveData(response)) {
        let user = setUserInformation(response.data[0]);
        setAuthData(user, response.data[0].token);
        return { user: user, token: response.data[0].token };
      } else {
        return { user: {}, token: "" };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) || "Sign-in request failed";
      return rejectWithValue({ error: errMsg });
    }
  }
);

export { signIn };
