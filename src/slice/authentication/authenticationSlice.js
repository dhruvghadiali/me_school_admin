import { createSlice } from "@reduxjs/toolkit";
import { validateUser } from "@/slice/authentication/authenticationAction";
import { responseMessage } from "@MEUtils/responseMessage";

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    isValidUser: false,
    loader: false,
    error: "",
    user: {},
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
      state.validateUser = true;
    },
    signOutUser: (state, _) => {
      state.user = {};
      state.loader = false;
      state.isValidUser = false;
      localStorage.clear();
    }
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

export const { setUserDetails, signOutUser } = authenticationSlice.actions;

export default authenticationSlice.reducer;
