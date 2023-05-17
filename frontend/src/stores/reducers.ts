import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AppState,
  HallType,
  TableType,
  DepartmentType,
  CategoryType,
  ProductType,
  OrderType,
} from "./types";

const initialState: AppState = {
  jwtToken: null,
  halls: null,
  selectedHall: null,
  selectedTable: null,
  departments: null,
  categories: null,
  products: null,
  order: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setJwtToken: (state, action: PayloadAction<string | null>) => {
      state.jwtToken = action.payload;
    },
    setHalls: (state, action: PayloadAction<HallType[] | null>) => {
      state.halls = action.payload;
    },
    setSelectedHall: (state, action: PayloadAction<HallType | null>) => {
      state.selectedHall = action.payload;
    },
    setSelectedTable: (state, action: PayloadAction<TableType | null>) => {
      state.selectedTable = action.payload;
    },
    setDepartments: (state, action: PayloadAction<DepartmentType[] | null>) => {
      state.departments = action.payload;
    },
    setCategories: (state, action: PayloadAction<CategoryType[] | null>) => {
      state.categories = action.payload;
    },
    setProducts: (state, action: PayloadAction<ProductType[] | null>) => {
      state.products = action.payload;
    },
    setOrder: (state, action: PayloadAction<OrderType | null>) => {
      state.order = action.payload;
    },
  },
});

export const {
  setJwtToken,
  setHalls,
  setSelectedHall,
  setSelectedTable,
  setDepartments,
  setCategories,
  setProducts,
  setOrder,
} = appSlice.actions;

export default appSlice.reducer;
