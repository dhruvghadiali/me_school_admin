import { createSlice } from "@reduxjs/toolkit";

import { PROFILE_TABS_ID } from "@MEHelpers/enums";
import {
  updateSchoolAbout,
} from "@MERedux/profile/profileAction";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileLoader: false,
    aboutSchoolFormSheetOpen: false,
    memberFormSheetOpen: false,
    addressFormSheetOpen: false,
    schoolAboutFormLoader: false,
    memberFormLoader: false,
    addressFormLoader: false,
    schoolAboutFormLoaderError: "",
    memberFormLoaderError: "",
    addressFormLoaderError: "",
    activeTab: PROFILE_TABS_ID.SCHOOL,
  },
  reducers: {
    resetProfileFormSheetStatus: (state) => {
      state.aboutSchoolFormSheetOpen = false;
      state.memberFormSheetOpen = false;
      state.addressFormSheetOpen = false;
      state.schoolAboutFormLoader = false;
      state.memberFormLoader = false;
      state.addressFormLoader = false;
      state.schoolAboutFormLoaderError = "";
      state.memberFormLoaderError = "";
      state.addressFormLoaderError = "";
    },
    setAboutSchoolFormSheetStatus: (state, action) => {
      state.aboutSchoolFormSheetOpen = action.payload;
      if(action.payload){
        state.schoolAboutFormLoaderError = "";
        state.schoolAboutFormLoader = false;
      }
    },
    setMemberFormSheetStatus: (state, action) => {
      state.memberFormSheetOpen = action.payload;
      if(action.payload){
        state.memberFormLoaderError = "";
        state.memberFormLoader = false;
      }
    },
    setAddressFormSheetStatus: (state, action) => {
      state.addressFormSheetOpen = action.payload;
      if(action.payload){
        state.addressFormLoaderError = "";
        state.addressFormLoader = false;
      }
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateSchoolAbout.pending, (state) => {
        state.schoolAboutFormLoader = true;
        state.schoolAboutFormLoaderError = "";
      })
      .addCase(updateSchoolAbout.fulfilled, (state, action) => {
        state.schoolAboutFormLoader = false;
        state.aboutSchoolFormSheetOpen = action.payload.error ? true : false;
        state.schoolAboutFormLoaderError = action.payload.error;
      })
      .addCase(updateSchoolAbout.rejected, (state, action) => {
        state.schoolAboutFormLoader = false;
        state.schoolAboutFormLoaderError = action.payload.error;
      });
  },
});

export const {
  setActiveTab,
  setMemberFormSheetStatus,
  setAddressFormSheetStatus,
  resetProfileFormSheetStatus,
  setAboutSchoolFormSheetStatus,
} = profileSlice.actions;

export default profileSlice.reducer;
