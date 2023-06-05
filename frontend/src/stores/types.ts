export interface TableType {
  id: number;
  tableNumber: string;
}

export interface HallType {
  title: string;
  tables: TableType[];
}

export interface UserType {
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  email: string | null;
  imageUrl: string | null;
}

export interface DepartmentType {
  title: string;
}

export interface CategoryType {
  title: string;
  department: DepartmentType;
}

export interface ProductType {
  title: string;
  description: string | null;
  price: number;
  stock: number | null;
  imageUrl: string;
  isInStoplist: boolean;
  slug: string;
  category: CategoryType;
}

export interface ProductOrderItemType {
  product: ProductType;
  amount: number;
}

export interface OrderType {
  products: ProductOrderItemType[];
  commentary: string;
  isTakeaway: boolean | null;
  paidAmount: number;
}

export interface FetchedOrderType extends OrderType {
  id: number;
  hall: string;
  table: string;
  createdAt: string;
  fullPrice: number;
  submission: number;
}

export interface AppState {
  jwtToken: string | null;
  user: UserType | null;
  halls: HallType[] | null;
  selectedHall: HallType | null;
  selectedTable: TableType | null;
  departments: DepartmentType[] | null;
  categories: CategoryType[] | null;
  products: ProductType[] | null;
  order: OrderType;
  orders: FetchedOrderType[] | null;
}

export enum ActionType {
  RESET_STATE = "RESET_STATE",
  SET_JWT_TOKEN = "SET_JWT_TOKEN",
  SET_USER = "SET_USER",
  SET_HALLS = "SET_HALLS",
  SET_SELECTED_HALL = "SET_SELECTED_HALL",
  SET_SELECTED_TABLE = "SET_SELECTED_TABLE",
  SET_DEPARTMENTS = "SET_DEPARTMENTS",
  SET_CATEGORIES = "SET_CATEGORIES",
  SET_PRODUCTS = "SET_PRODUCTS",
  SET_ORDER = "SET_ORDER",
  RESET_ORDER = "RESET_ORDER",
  SET_ORDERS = "SET_ORDERS",
}

export interface ResetStateAction {
  type: ActionType.RESET_STATE;
}

export interface SetJwtTokenAction {
  type: ActionType.SET_JWT_TOKEN;
  payload: string | null;
}

export interface SetUserAction {
  type: ActionType.SET_USER;
  payload: UserType | null;
}

export interface SetHallsAction {
  type: ActionType.SET_HALLS;
  payload: HallType[] | null;
}

export interface SetSelectedHallAction {
  type: ActionType.SET_SELECTED_HALL;
  payload: HallType | null;
}

export interface SetSelectedTableAction {
  type: ActionType.SET_SELECTED_TABLE;
  payload: TableType | null;
}

export interface SetDepartmentsAction {
  type: ActionType.SET_DEPARTMENTS;
  payload: DepartmentType[] | null;
}

export interface SetCategoriesAction {
  type: ActionType.SET_CATEGORIES;
  payload: CategoryType[] | null;
}

export interface SetProductsAction {
  type: ActionType.SET_PRODUCTS;
  payload: ProductType[] | null;
}

export interface SetOrderAction {
  type: ActionType.SET_ORDER;
  payload: OrderType;
}

export interface ResetOrderAction {
  type: ActionType.RESET_ORDER;
}

export interface SetOrdersAction {
  type: ActionType.SET_ORDERS;
  payload: FetchedOrderType[] | null;
}

export const resetState = (): ResetStateAction => ({
  type: ActionType.RESET_STATE,
});

export const setJwtToken = (token: string | null): SetJwtTokenAction => ({
  type: ActionType.SET_JWT_TOKEN,
  payload: token,
});

export const setUser = (user: UserType | null): SetUserAction => ({
  type: ActionType.SET_USER,
  payload: user,
});

export const setHalls = (data: HallType[] | null): SetHallsAction => ({
  type: ActionType.SET_HALLS,
  payload: data,
});

export const setSelectedHall = (
  hall: HallType | null
): SetSelectedHallAction => ({
  type: ActionType.SET_SELECTED_HALL,
  payload: hall,
});

export const setSelectedTable = (
  table: TableType | null
): SetSelectedTableAction => ({
  type: ActionType.SET_SELECTED_TABLE,
  payload: table,
});

export const setDepartments = (
  departments: DepartmentType[] | null
): SetDepartmentsAction => ({
  type: ActionType.SET_DEPARTMENTS,
  payload: departments,
});

export const setCategories = (
  categories: CategoryType[] | null
): SetCategoriesAction => ({
  type: ActionType.SET_CATEGORIES,
  payload: categories,
});

export const setProducts = (
  products: ProductType[] | null
): SetProductsAction => ({
  type: ActionType.SET_PRODUCTS,
  payload: products,
});

export const setOrder = (order: OrderType): SetOrderAction => ({
  type: ActionType.SET_ORDER,
  payload: order,
});

export const resetOrder = (): ResetOrderAction => ({
  type: ActionType.RESET_ORDER,
});

export const setOrders = (
  orders: FetchedOrderType[] | null
): SetOrdersAction => ({
  type: ActionType.SET_ORDERS,
  payload: orders,
});
