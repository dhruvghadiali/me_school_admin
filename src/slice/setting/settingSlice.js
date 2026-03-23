import { createSlice } from "@reduxjs/toolkit";

import { changeUsername, changePassword } from "@MERedux/setting/settingAction";

const initialState = {
  changeUsernameLoader: false,
  changeUsernameError: "",
  changeUsernameSuccess: false,
  changePasswordLoader: false,
  changePasswordError: "",
  changePasswordSuccess: false,
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    resetSettingState: () => initialState,
    resetChangeUsernameStatus: (state) => {
      state.changeUsernameError = "";
      state.changeUsernameSuccess = false;
    },
    resetChangePasswordStatus: (state) => {
      state.changePasswordError = "";
      state.changePasswordSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeUsername.pending, (state) => {
        state.changeUsernameLoader = true;
        state.changeUsernameError = "";
        state.changeUsernameSuccess = false;
      })
      .addCase(changeUsername.fulfilled, (state, action) => {
        state.changeUsernameLoader = false;
        state.changeUsernameError = action.payload.error;
        state.changeUsernameSuccess = !action.payload.error;
      })
      .addCase(changeUsername.rejected, (state, action) => {
        state.changeUsernameLoader = false;
        state.changeUsernameError = action.payload?.error || "Failed to change username";
        state.changeUsernameSuccess = false;
      })
      .addCase(changePassword.pending, (state) => {
        state.changePasswordLoader = true;
        state.changePasswordError = "";
        state.changePasswordSuccess = false;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.changePasswordLoader = false;
        state.changePasswordError = action.payload.error;
        state.changePasswordSuccess = !action.payload.error;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.changePasswordLoader = false;
        state.changePasswordError = action.payload?.error || "Failed to change password";
        state.changePasswordSuccess = false;
      });
  },
});

export const {
  resetSettingState,
  resetChangeUsernameStatus,
  resetChangePasswordStatus,
} = settingSlice.actions;

export default settingSlice.reducer;
