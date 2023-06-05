import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AppState,
  UserType,
  HallType,
  TableType,
  DepartmentType,
  CategoryType,
  ProductType,
  OrderType,
  FetchedOrderType,
} from "./types";

const initialState: AppState = {
  jwtToken: null,
  user: null,
  halls: null,
  selectedHall: null,
  selectedTable: null,
  departments: null,
  categories: null,
  products: null,
  order: {
    products: [],
    commentary: "",
    isTakeaway: null,
    paidAmount: 0,
  },
  orders: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    resetState: (state: AppState) => {
      state = initialState;
    },
    setJwtToken: (state, action: PayloadAction<string | null>) => {
      state.jwtToken = action.payload;
    },
    setUser: (state, action: PayloadAction<UserType | null>) => {
      state.user = action.payload;
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
    setOrder: (state, action: PayloadAction<OrderType>) => {
      state.order = action.payload;
    },
    resetOrder: (state) => {
      state.order = initialState.order;
    },
    setOrders: (state, action: PayloadAction<FetchedOrderType[] | null>) => {
      state.orders = action.payload;
    },
  },
});

export const {
  resetState,
  setJwtToken,
  setUser,
  setHalls,
  setSelectedHall,
  setSelectedTable,
  setDepartments,
  setCategories,
  setProducts,
  setOrder,
  resetOrder,
  setOrders,
} = appSlice.actions;

export default appSlice.reducer;
