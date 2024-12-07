import { createSlice } from "@reduxjs/toolkit";
import { sidebarMenuName } from "../../utils/enums";

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    activeMenu: sidebarMenuName.HOME,
  },
  reducers: {
    changeActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
  },
});

export const { changeActiveMenu } = sidebarSlice.actions;

export default sidebarSlice.reducer;
