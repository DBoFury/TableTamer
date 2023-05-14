// redux/types.ts

// Define the state shape
export interface AppState {
  jwtToken: string | null;
  // other state properties...
}

// Define action types
export enum ActionType {
  SET_JWT_TOKEN = "SET_JWT_TOKEN",
  // other action types...
}

// Define action interfaces
export interface SetJwtTokenAction {
  type: ActionType.SET_JWT_TOKEN;
  payload: string | null;
}

// Create action creators
export const setJwtToken = (token: string | null): SetJwtTokenAction => ({
  type: ActionType.SET_JWT_TOKEN,
  payload: token,
});
