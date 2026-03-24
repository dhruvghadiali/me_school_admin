import { createSlice } from "@reduxjs/toolkit";

import { changeUsername, changePassword } from "@MERedux/setting/settingAction";

const initialState = {
  changeUsernameLoader: false,
  changeUsernameError: "",
  changePasswordLoader: false,
  changePasswordError: "",
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    resetSettingState: () => initialState,
    resetChangeUsernameStatus: (state) => {
      state.changeUsernameError = "";
      state.changeUsernameLoader = false;
    },
    resetChangePasswordStatus: (state) => {
      state.changePasswordError = "";
      state.changePasswordLoader = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeUsername.pending, (state) => {
        state.changeUsernameLoader = true;
        state.changeUsernameError = "";
      })
      .addCase(changeUsername.fulfilled, (state, action) => {
        state.changeUsernameLoader = false;
        state.changeUsernameError = action.payload.error;
      })
      .addCase(changeUsername.rejected, (state, action) => {
        state.changeUsernameLoader = false;
        state.changeUsernameError = action.payload.error;
      })
      .addCase(changePassword.pending, (state) => {
        state.changePasswordLoader = true;
        state.changePasswordError = "";
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.changePasswordLoader = false;
        state.changePasswordError = action.payload.error;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.changePasswordLoader = false;
        state.changePasswordError = action.payload.error;
      });
  },
});

export const {
  resetSettingState,
  resetChangeUsernameStatus,
  resetChangePasswordStatus,
} = settingSlice.actions;

export default settingSlice.reducer;
