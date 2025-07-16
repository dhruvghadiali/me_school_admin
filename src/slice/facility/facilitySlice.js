import { createSlice } from "@reduxjs/toolkit";

import {
  getFacilityTypes,
  getFacilities,
} from "@/slice/facility/facilityAction";

export const facilitySlice = createSlice({
  name: "facility",
  initialState: {
    facilityLoader: false,
    facilityFormLoader: false,
    facilityError: "",
    facilityFormError: "",
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
      });
  },
});

export const { setSelectedFacilityType } = facilitySlice.actions;

export default facilitySlice.reducer;
