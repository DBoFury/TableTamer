import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState, HallType } from "./types";

const initialState: AppState = {
  jwtToken: null,
  hallsData: null,
  selectedHall: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setJwtToken: (state, action: PayloadAction<string | null>) => {
      state.jwtToken = action.payload;
    },
    setHallsData: (state, action: PayloadAction<HallType[] | null>) => {
      state.hallsData = action.payload;
    },
    setSelectedHall: (state, action: PayloadAction<string | null>) => {
      state.selectedHall = action.payload;
    },
  },
});

export const { setJwtToken, setHallsData, setSelectedHall } = appSlice.actions;

export default appSlice.reducer;
