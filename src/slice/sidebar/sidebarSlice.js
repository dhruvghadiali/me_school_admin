import { createSlice } from "@reduxjs/toolkit";
import { sidebarMenuName } from "@MEUtils/enums";

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    activeMenu: sidebarMenuName.DASHBOARD,
  },
  reducers: {
    changeActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
  },
});

export const { changeActiveMenu } = sidebarSlice.actions;

export default sidebarSlice.reducer;
