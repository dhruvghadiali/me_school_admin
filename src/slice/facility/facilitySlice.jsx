import { createSlice } from "@reduxjs/toolkit";

import {
  addFacility,
  getFacilities,
  deleteFacility,
  getFacilityTypes,
} from "@MERedux/facility/facilityAction";

export const facilitySlice = createSlice({
  name: "facility",
  initialState: {
    facilityLoader: false,
    facilityError: "",
    selectedFacilityType: "",
    facilities: [],
    facilityTypes: [],
  },
  reducers: {
    setSelectedFacilityType: (state, action) => {
      state.selectedFacilityType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFacilityTypes.pending, (state) => {
        state.facilityLoader = true;
        state.facilityTypes = [];
      })
      .addCase(getFacilityTypes.fulfilled, (state, action) => {
        state.facilityTypes = action.payload.facilityTypes;
      })
      .addCase(getFacilityTypes.rejected, (state, action) => {
        state.facilityLoader = false;
        state.facilityTypes = [];
      })
      .addCase(getFacilities.pending, (state) => {
        state.facilityError = "";
        state.facilities = [];
      })
      .addCase(getFacilities.fulfilled, (state, action) => {
        state.facilityLoader = false;
        state.facilityError = action.payload.error;
        state.facilities = action.payload.facilities;
      })
      .addCase(getFacilities.rejected, (state, action) => {
        state.facilityLoader = false;
        state.facilityError = action.payload.error;
        state.facilities = action.payload.facilities;
      })
      .addCase(addFacility.pending, (state) => {
        state.facilityLoader = true;
      })
      .addCase(addFacility.fulfilled, (state, action) => {
      })
      .addCase(addFacility.rejected, (state, action) => {
        state.facilityLoader = false;
      })
      .addCase(deleteFacility.pending, (state) => {
        state.facilityLoader = true;
      })
      .addCase(deleteFacility.fulfilled, (state, action) => {
      })
      .addCase(deleteFacility.rejected, (state, action) => {
        state.facilityLoader = false;
      });
  },
});

export const { setSelectedFacilityType } = facilitySlice.actions;

export default facilitySlice.reducer;
