export interface TableType {
  id: number;
  tableNumber: string;
}

export interface HallType {
  title: string;
  titleUkr: string;
  tables: TableType[];
}

export interface UserType {
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  email: string | null;
}

export interface DepartmentType {
  title: string;
  titleUkr: string;
}

export interface CategoryType {
  title: string;
  titleUkr: string;
  department: DepartmentType;
}

export interface ProductType {
  title: string;
  titleUkr: string;
  description: string | null;
  descriptionUkr: string | null;
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
  user: UserType | null;
  products: ProductOrderItemType[] | null;
  commentary: string | null;
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
  order: OrderType | null;
}

export enum ActionType {
  SET_JWT_TOKEN = "SET_JWT_TOKEN",
  SET_USER = "SET_USER",
  SET_HALLS = "SET_HALLS",
  SET_SELECTED_HALL = "SET_SELECTED_HALL",
  SET_SELECTED_TABLE = "SET_SELECTED_TABLE",
  SET_DEPARTMENTS = "SET_DEPARTMENTS",
  SET_CATEGORIES = "SET_CATEGORIES",
  SET_PRODUCTS = "SET_PRODUCTS",
  SET_ORDER = "SET_ORDER",
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
  payload: OrderType | null;
}

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

export const setOrder = (order: OrderType | null): SetOrderAction => ({
  type: ActionType.SET_ORDER,
  payload: order,
});
