import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./types";

const initialState: AppState = {
  jwtToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setJwtToken: (state, action: PayloadAction<string | null>) => {
      state.jwtToken = action.payload;
    },
  },
});

export const { setJwtToken } = authSlice.actions;

export default authSlice.reducer;
