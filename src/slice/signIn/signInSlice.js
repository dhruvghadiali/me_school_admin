import { createSlice } from "@reduxjs/toolkit";
import { validateUser } from "@MERedux/signIn/signInAction";
import { responseMessage } from "@MEUtils/responseMessage";

export const signInSlice = createSlice({
  name: "signIn",
  initialState: {
    isValidUser: false,
    loader: false,
    error: "",
    user: {},
  },
  reducers: {
    resetState: (state, _) => {
      state.user = {};
      state.isValidUser = false;
      state.loader = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateUser.pending, (state, _) => {
        state.user = {};
        state.error = "";
        state.loader = true;
        state.isValidUser = false;
      })
      .addCase(validateUser.fulfilled, (state, action) => {
        state.loader = false;
        state.user = action.payload.user;
        state.error = action.payload.error;
        state.isValidUser = action.payload.isValidUser;
      })
      .addCase(validateUser.rejected, (state, action) => {
        state.user = {};
        state.loader = false;
        state.isValidUser = false;
        state.error = action.payload.error || responseMessage.somethingWentWrong;
      });
  },
});

export const { resetState } = signInSlice.actions;

export default signInSlice.reducer;
