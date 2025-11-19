import { axiosInstance } from "@MEUtils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthData } from '@MEHelpers/authHelpers';

// Define the sign-in API route relative to axiosInstance.baseURL
const signInAPIRoute = "/signin";

const signIn = createAsyncThunk(
  "authentication/signIn",
  async (payload, { rejectWithValue }) => {
    try {
      // Use the pre-configured axios instance (baseURL + timeout + headers)
      const response = await axiosInstance.post(signInAPIRoute, payload, {
        autoLogoutOnUnauthorized: false,
      });

      if (
        response &&
        response.data &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
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
