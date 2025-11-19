import { createSlice } from "@reduxjs/toolkit";

import { signIn } from "@MERedux/authentication/authenticationAction";
import { clearAuthData } from "@MEHelpers/authHelpers";

export const signInSlice = createSlice({
  name: "signIn",
  initialState: {
    user: {},
    token: "",
    error: "",
    loader: false,
  },
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token || "";
    },
    signOut: (state, _) => {
      state.user = {};
      state.token = "";
      clearAuthData();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state, _) => {
        state.user = {};
        state.token = "";
        state.error = "";
        state.loader = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = "";
        state.loader = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.user = {};
        state.token = "";
        state.error = action.payload.error;
        state.loader = false;
      });
  },
});

export const { setLogin, signOut } = signInSlice.actions;

export default signInSlice.reducer;
