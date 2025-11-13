import { createSlice } from "@reduxjs/toolkit";

// import { signInFormState } from "@MEUtils/enums";
// import { responseMessage } from "@MEUtils/responseMessage";
// import { validateUser, sendOtp, verifyOtp } from "@MERedux/signIn/signInAction";

export const signInSlice = createSlice({
  name: "signIn",
  initialState: {
    user: {},
    error: "",
    emailOtp: "",
    loader: false,
    phoneNumberOtp: "",
    isValidUser: false,
    verificationToken: "",
    // currentSignInFormStatus: signInFormState.SI,
  },
  reducers: {
    // resetSignInFormState: (state, _) => {
    //   state.user = {};
    //   state.error = "";
    //   state.loader = false;
    //   state.isValidUser = false;
    //   state.currentSignInFormStatus = signInFormState.SI;
    // },
    // resetSignInVerificationFormState: (state, _) => {
    //   state.emailOtp = "";
    //   state.phoneNumberOtp = "";
    // },
    // changeSignInFormState: (state, action) => {
    //   state.currentSignInFormStatus = action.payload;
    // },
    // setEmailOtp: (state, action) => {
    //   state.emailOtp = action.payload;
    // },
    // setPhoneNumberOtp: (state, action) => {
    //   state.phoneNumberOtp = action.payload;
    // },
    // setUserDetails: (state, action) => {
    //   state.user = action.payload;
    // },
    // setLogin: (state, action) => {
    //   state.user = action.payload.userData;
    //   state.isValidUser = action.payload.isValidUser;
    //   if (action.payload.token) {
    //     // Store token if provided
    //     localStorage.setItem('authToken', action.payload.token);
    //     localStorage.setItem('userData', JSON.stringify(action.payload.userData));
    //   }
    // },
    // signOutUser: (state, _) => {
    //   state.user = {};
    //   state.isValidUser = false;
    //   state.currentSignInFormStatus = signInFormState.SI;
    //   localStorage.clear();
    // }
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(validateUser.pending, (state, _) => {
    //     state.user = {};
    //     state.error = "";
    //     state.loader = true;
    //     state.isValidUser = false;
    //   })
    //   .addCase(validateUser.fulfilled, (state, action) => {
    //     state.loader = false;
    //     state.user = action.payload.user;
    //     state.error = action.payload.error;
    //     state.isValidUser = action.payload.isValidUser;
    //     state.currentSignInFormStatus = action.payload.currentSignInFormStatus;
    //   })
    //   .addCase(validateUser.rejected, (state, action) => {
    //     state.loader = false;
    //     state.isValidUser = false;
    //     state.error =
    //       action.payload.message || responseMessage.somethingWentWrong;
    //   })
    //   .addCase(sendOtp.pending, (state, _) => {
    //     state.error = "";
    //     state.emailOtp = "";
    //     state.loader = true;
    //     state.phoneNumberOtp = "";
    //     state.isValidUser = false;
    //     state.verificationToken = "";
    //   })
    //   .addCase(sendOtp.fulfilled, (state, action) => {
    //     state.loader = false;
    //     state.error = action.payload.error;
    //     state.verificationToken = action.payload.verificationToken;
    //     state.currentSignInFormStatus = action.payload.currentSignInFormStatus;
    //   })
    //   .addCase(sendOtp.rejected, (state, action) => {
    //     state.isValidUser = false;
    //     state.loader = false;
    //     state.error =
    //       action.payload.message || responseMessage.somethingWentWrong;
    //   })
    //   .addCase(verifyOtp.pending, (state, _) => {
    //     state.loader = true;
    //     state.error = "";
    //   })
    //   .addCase(verifyOtp.fulfilled, (state, action) => {
    //     state.loader = false;
    //     state.error = action.payload.error;
    //     state.currentSignInFormStatus = action.payload.currentSignInFormStatus;
    //   })
    //   .addCase(verifyOtp.rejected, (state, action) => {
    //     state.loader = false;
    //     state.error =
    //       action.payload.message || responseMessage.somethingWentWrong;
    //     state.currentSignInFormStatus = signInFormState.ER;
    //   });
  },
});

export const {
  setLogin,
  signOutUser,
  setEmailOtp,
  setUserDetails,
  setPhoneNumberOtp,
  resetSignInFormState,
  changeSignInFormState,
  resetSignInVerificationFormState,
} = signInSlice.actions;

export default signInSlice.reducer;
