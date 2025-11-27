import { createSlice } from "@reduxjs/toolkit";
import { SIDEBAR_MENU_NAMES } from "@MEHelpers/enums";

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    activeMenu: SIDEBAR_MENU_NAMES.DASHBOARD,
  },
  reducers: {
    changeActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
  },
});

export const { changeActiveMenu } = sidebarSlice.actions;

export default sidebarSlice.reducer;
