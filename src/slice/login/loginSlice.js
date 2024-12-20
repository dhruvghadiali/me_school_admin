import { createSlice } from "@reduxjs/toolkit";
import { validateUser } from "@MERedux/login/loginAction";
import { responseMessage } from "@MEUtils/responseMessage";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isValidUser: false,
    loader: false,
    error: "",
  },
  reducers: {
    resetState: (state, _) => {
      state.isValidUser = false;
      state.loader = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateUser.pending, (state, _) => {
        state.isValidUser = false;
        state.loader = true;
        state.error = "";
      })
      .addCase(validateUser.fulfilled, (state, _) => {
        state.isValidUser = true;
        state.loader = false;
        state.error = "";
      })
      .addCase(validateUser.rejected, (state, action) => {
        state.isValidUser = false;
        state.loader = false;
        state.error = action.payload || responseMessage.somethingWentWrong;
      });
  },
});

export const { resetState } = loginSlice.actions;

export default loginSlice.reducer;
