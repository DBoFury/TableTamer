import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState, HallType, TableType } from "./types";

const initialState: AppState = {
  jwtToken: null,
  hallsData: null,
  selectedHall: null,
  selectedTable: null,
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
    setSelectedHall: (state, action: PayloadAction<HallType | null>) => {
      state.selectedHall = action.payload;
    },
    setSelectedTable: (state, action: PayloadAction<TableType | null>) => {
      state.selectedTable = action.payload;
    },
  },
});

export const { setJwtToken, setHallsData, setSelectedHall, setSelectedTable } =
  appSlice.actions;

export default appSlice.reducer;
