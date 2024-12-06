import { createSlice } from "@reduxjs/toolkit";
import { validateUser } from "./loginAction";
import { responseMessage } from "../../utils/responseMessage";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    loader: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(validateUser.pending, (state, action) => {
        state.loader = true;
        state.error = "";
      })
      .addCase(validateUser.fulfilled, (state, action) => {
        state.loader = false;
        state.error = "";
      })
      .addCase(validateUser.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload || responseMessage.somethingWentWrong;
      });
  },
});

export const {} = loginSlice.actions;

export default loginSlice.reducer;
