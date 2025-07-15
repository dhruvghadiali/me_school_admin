import { createSlice } from "@reduxjs/toolkit";
import { getFacilityTypes } from "@/slice/facility/facilityAction";

export const facilitySlice = createSlice({
  name: "facility",
  initialState: {
    selectedFacilityType: "",
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
        state.facilityTypes = [];
      })
      .addCase(getFacilityTypes.fulfilled, (state, action) => {
        state.facilityTypes = action.payload.facilityTypes;
      })
      .addCase(getFacilityTypes.rejected, (state, action) => {
        state.facilityTypes = [];
      });
  },
});

export const { setSelectedFacilityType } = facilitySlice.actions;

export default facilitySlice.reducer;
