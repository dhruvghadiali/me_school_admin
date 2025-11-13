// import { createAsyncThunk } from "@reduxjs/toolkit";

// import { signInFormState } from "@MEUtils/enums";

// import {
//   signInAPIRoute,
//   signUpSendOTPAPIRoute,
//   signUpOTPVerificationAPIRoute,
// } from "@MEUtils/apiRoutes";
// import {
//   signInAPIResponse,
//   signInSendOTPAPIResponse,
// } from "@MEUtils/apiResponse";
// import {
//   isMockEnvironment,
//   getMockAPIResponse,
//   defaultAPIErrorResponse,
//   isAPIServedSuccessfully,
// } from "@MEUtils/utilityFunctions";

// import axios from "axios";

// export const validateUser = createAsyncThunk(
//   "signIn/validateUser",
//   async (payload, { rejectWithValue, getState }) => {
//     try {
//       let response;
//       let user = {};

//       if (isMockEnvironment()) {
//         response = await getMockAPIResponse(
//           getState().mock.apiResponseStatus,
//           "signIn"
//         );
//       } else {
//         response = await axios.post(
//           `${process.env.REACT_APP_API_BASE_URL}${signInAPIRoute}`,
//           payload
//         );

//         if (response) response = response.data;
//       }

//       if (isAPIServedSuccessfully(response)) {
//         if (response && response.data && response.data.length > 0) {
//           user = signInAPIResponse(response.data[0]);
//           if (!user.isAccountVerified) {
//             return {
//               error: "",
//               user: user,
//               isValidUser: false,
//               currentSignInFormStatus: signInFormState.ANV,
//             };
//           } else {
//             localStorage.setItem("user", JSON.stringify(user));
//             return {
//               error: "",
//               user: user,
//               isValidUser: true,
//               currentSignInFormStatus: signInFormState.SI,
//             };
//           }
//         } else {
//           return {
//             user: user,
//             isValidUser: false,
//             error: response.message || defaultAPIErrorResponse.message,
//             currentSignInFormStatus: signInFormState.SI,
//           };
//         }
//       } else {
//         return {
//           user: user,
//           isValidUser: false,
//           error: response.message || defaultAPIErrorResponse.message,
//           currentSignInFormStatus: signInFormState.SI,
//         };
//       }
//     } catch (error) {
//       if (
//         error &&
//         error.response &&
//         error.response.data &&
//         error.response.data.message
//       ) {
//         return rejectWithValue({ message: error.response.data.message });
//       }
//       return rejectWithValue(defaultAPIErrorResponse);
//     }
//   }
// );

// export const sendOtp = createAsyncThunk(
//   "signIn/sendOtp",
//   async (payload, { rejectWithValue, getState }) => {
//     try {
//       let response;
//       if (isMockEnvironment()) {
//         response = await getMockAPIResponse(
//           getState().mock.apiResponseStatus,
//           "sendOtp"
//         );
//       } else {
//         response = await axios.post(
//           `${process.env.REACT_APP_API_BASE_URL}${signUpSendOTPAPIRoute}`,
//           payload
//         );

//         if (response) response = response.data;
//       }

//       if (isAPIServedSuccessfully(response)) {
//         if (response && response.data && response.data.length > 0) {
//           return {
//             error: "",
//             currentSignInFormStatus: signInFormState.AV,
//             verificationToken: signInSendOTPAPIResponse(response.data[0]),
//           };
//         } else {
//           return {
//             verificationToken: "",
//             currentSignInFormStatus: signInFormState.ANV,
//             error: response.message || defaultAPIErrorResponse.message,
//           };
//         }
//       } else {
//         return {
//           verificationToken: "",
//           currentSignInFormStatus: signInFormState.ANV,
//           error: response.message || defaultAPIErrorResponse.message,
//         };
//       }
//     } catch (error) {
//       if (
//         error &&
//         error.response &&
//         error.response.data &&
//         error.response.data.message
//       ) {
//         return rejectWithValue({ message: error.response.data.message });
//       }
//       return rejectWithValue(defaultAPIErrorResponse);
//     }
//   }
// );

// /**
//  * Action Name: verifyOtp
//  * Description: This action will used for request backend to validate email and phone number OTP for new register user.
//  * Parameters: (Variable Name : Payload)
//  *  - @param {<String>} user_id             - User id
//  *  - @param {<String>} verification_token  - OTP verification token
//  *  - @param {<number>} email_otp           - Email OTP
//  *  - @param {<number>} phone_otp           - Phone number OTP
//  * Returns:
//  *  - @returns {<object>} API will return empty data
//  * Logic:
//  *  - Step 1: Check application environment. (Mock environment will give mock response)
//  *  - Step 2: Call API to verify OTP for email and phone number.
//  *  - Step 3: On Success call store (currentSignUpFormStatus, error) in redux store.
//  *            On Error store error message on redux store.
//  * Usage:
//  *  - This action usage is only for request backend service to validate email and phone number OTP for new register user.
//  *  - This action will call from signup from (OTP Verification form).
//  */
// export const verifyOtp = createAsyncThunk(
//   "signUp/verifyOtp",
//   async (payload, { rejectWithValue, getState }) => {
//     try {
//       let response;
//       if (isMockEnvironment()) {
//         response = await getMockAPIResponse(
//           getState().mock.apiResponseStatus,
//           "verifyOtp"
//         );
//       } else {
//         response = await axios.post(
//           `${process.env.REACT_APP_API_BASE_URL}${signUpOTPVerificationAPIRoute}`,
//           payload
//         );

//         if (response) response = response.data;
//       }

//       if (isAPIServedSuccessfully(response)) {
//         if (response && response.data && response.data.length > 0) {
//           return {
//             error: "",
//             currentSignInFormStatus: signInFormState.SU,
//           };
//         } else {
//           return {
//             error: response.message || defaultAPIErrorResponse.message,
//             currentSignInFormStatus: signInFormState.SU,
//           };
//         }
//       } else {
//         return {
//           error: response.message || defaultAPIErrorResponse.message,
//           currentSignInFormStatus: signInFormState.ER,
//         };
//       }
//     } catch (error) {
//       if (
//         error &&
//         error.response &&
//         error.response.data &&
//         error.response.data.message
//       ) {
//         return rejectWithValue({ message: error.response.data.message });
//       }
//       return rejectWithValue(defaultAPIErrorResponse);
//     }
//   }
// );
