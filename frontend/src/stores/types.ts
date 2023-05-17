export interface TableType {
  tableNumber: string;
}

export interface HallType {
  title: string;
  titleUkr: string;
  tables: TableType[];
}

export interface AppState {
  jwtToken: string | null;
  hallsData: HallType[] | null;
  selectedHall: HallType | null;
  selectedTable: TableType | null;
  // other state properties...
}

export enum ActionType {
  SET_JWT_TOKEN = "SET_JWT_TOKEN",
  SET_HALLS_DATA = "SET_HALLS_DATA",
  SET_SELECTED_HALL = "SET_SELECTED_HALL",
  SET_SELECTED_TABLE = "SET_SELECTED_TABLE",
  // other action types...
}

export interface SetJwtTokenAction {
  type: ActionType.SET_JWT_TOKEN;
  payload: string | null;
}

export interface SetHallsDataAction {
  type: ActionType.SET_HALLS_DATA;
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

export const setJwtToken = (token: string | null): SetJwtTokenAction => ({
  type: ActionType.SET_JWT_TOKEN,
  payload: token,
});

export const setHallsData = (data: HallType[] | null): SetHallsDataAction => ({
  type: ActionType.SET_HALLS_DATA,
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
