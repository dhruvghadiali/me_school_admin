import axios from "axios";

import { signOutUser } from "@MERedux/authentication/authenticationSlice";
import {
  isAuthorizedUser,
  isAPIServedSuccessfully,
  defaultAPIErrorResponse,
} from "@MEUtils/utilityFunctions";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = config.state;
    delete config.state;

    if (
      state &&
      state.authentication &&
      state.authentication.user &&
      state.authentication.user.token
    ) {
      config.headers.Authorization = `Bearer ${state.authentication.user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    let defaultResponse = defaultAPIErrorResponse;

    if (response && response.status) {
      if (isAPIServedSuccessfully(response)) {
        if (response && response.data) return response.data;
      }
    }

    return defaultResponse;
  },
  (error) => {
     let defaultResponse = defaultAPIErrorResponse;
     
    if (error && error.response && error.response.status) {
      if (!isAuthorizedUser(error.response)) {
        if (error.config && error.config.dispatch) {
          error.config.dispatch(signOutUser());
          window.location.href = "/signin";
        }
      }
    }

    if(error && error.response && error.response.data){
      return error.response.data;
    }

    return Promise.reject(defaultResponse);
  }
);

export default axiosInstance;
