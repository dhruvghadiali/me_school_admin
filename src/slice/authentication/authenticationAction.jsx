
import { createAsyncThunk } from "@reduxjs/toolkit";

import { setAuthData } from '@MEHelpers/authHelpers';
import { signInAPIRoute } from "@MEUtils/apiRoutes";
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
        setAuthData(response.data[0], response.data[0].token);
        return { user: response.data[0], token: response.data[0].token };
      }else{
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
