import { createSlice } from "@reduxjs/toolkit";

import { PROFILE_TABS_ID, PROFILE_FORM_SHEET_MODES } from "@MEHelpers/enums";
import {
  getStates,
  updateSchoolAbout,
  addOrganizationMember,
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
    schoolAboutFormError: "",
    memberFormError: "",
    addressFormError: "",
    memberFormSheetMode: PROFILE_FORM_SHEET_MODES.ADD,
    activeTab: PROFILE_TABS_ID.SCHOOL,
    memberFormInitialValue: {},
    states: [],
  },
  reducers: {
    resetProfileFormSheetStatus: (state) => {
      state.aboutSchoolFormSheetOpen = false;
      state.memberFormSheetOpen = false;
      state.addressFormSheetOpen = false;
      state.schoolAboutFormLoader = false;
      state.memberFormLoader = false;
      state.addressFormLoader = false;
      state.schoolAboutFormError = "";
      state.memberFormError = "";
      state.addressFormError = "";
    },
    setAboutSchoolFormSheetStatus: (state, action) => {
      state.aboutSchoolFormSheetOpen = action.payload;
      if (action.payload) {
        state.schoolAboutFormError = "";
        state.schoolAboutFormLoader = false;
      }
    },
    setMemberFormSheetStatus: (state, action) => {
      state.memberFormSheetOpen = action.payload.status;
      state.memberFormSheetMode = action.payload.mode;
      state.memberFormInitialValue = action.payload.formInitalValue || {};
      if (!action.payload.status) {
        state.memberFormError = "";
        state.memberFormLoader = false;
        state.memberFormInitialValue = {};
      }
    },
    setAddressFormSheetStatus: (state, action) => {
      state.addressFormSheetOpen = action.payload;
      if (action.payload) {
        state.addressFormError = "";
        state.addressFormLoader = false;
      }
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStates.pending, (state, action) => {
        state.states = [];
        state.profileLoader = true;
      })
      .addCase(getStates.fulfilled, (state, action) => {
        state.states = action.payload.data;
        state.profileLoader = false;
      })
      .addCase(getStates.rejected, (state, action) => {
        state.states = [];
        state.profileLoader = false;
      })
      .addCase(updateSchoolAbout.pending, (state, action) => {
        state.schoolAboutFormLoader = true;
        state.schoolAboutFormError = "";
      })
      .addCase(updateSchoolAbout.fulfilled, (state, action) => {
        state.schoolAboutFormLoader = false;
        state.aboutSchoolFormSheetOpen = action.payload.error ? true : false;
        state.schoolAboutFormError = action.payload.error;
      })
      .addCase(updateSchoolAbout.rejected, (state, action) => {
        state.schoolAboutFormLoader = false;
        state.schoolAboutFormError = action.payload.error;
      })
      .addCase(addOrganizationMember.pending, (state, action) => {
        state.memberFormLoader = true;
        state.memberFormError = "";
      })
      .addCase(addOrganizationMember.fulfilled, (state, action) => {
        state.memberFormLoader = false;
        state.memberFormSheetOpen = action.payload.error ? true : false;
        state.memberFormError = action.payload.error;
      })
      .addCase(addOrganizationMember.rejected, (state, action) => {
        state.memberFormLoader = false;
        state.memberFormError = action.payload.error;
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
