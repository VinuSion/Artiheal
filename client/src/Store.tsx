import React, { createContext, useReducer, ReactNode } from "react";
import {
  UserInfo,
  HealthData,
  Profile,
  Routine,
  Food,
} from "@/lib/constants";

// Defines the shape of the state
interface State {
  userInfo: UserInfo | null;
  healthData: HealthData | null;
  hasFilledHealthData: boolean;
  profile: Profile | null;
  routine: Routine | null;
  todaysFoods: Food[] | null;
}

// Defines the action types
type Action =
  | { type: "USER_SIGNIN"; payload: UserInfo }
  | { type: "USER_SIGNOUT" }
  | { type: "UPDATE_PICTURE_URL"; payload: string }
  | { type: "REMOVE_PICTURE_URL" }
  | { type: "CREATE_HEALTH_DATA"; payload: HealthData }
  | { type: "REMOVE_HEALTH_DATA" }
  | { type: "CREATE_PROFILE"; payload: Profile }
  | { type: "REMOVE_PROFILE" }
  | { type: "CREATE_ROUTINE"; payload: Routine }
  | { type: "REMOVE_ROUTINE" }
  | { type: "ASSIGN_TODAYS_FOODS"; payload: Food[] };

// Creates initial state by checking localStorage
const initialState: State = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null,
  healthData: localStorage.getItem("healthData")
    ? JSON.parse(localStorage.getItem("healthData")!)
    : null,
  hasFilledHealthData: !!localStorage.getItem("healthData"),
  profile: localStorage.getItem("profile")
    ? JSON.parse(localStorage.getItem("profile")!)
    : null,
  routine: localStorage.getItem("routine")
    ? JSON.parse(localStorage.getItem("routine")!)
    : null,
  todaysFoods: localStorage.getItem("todaysFoods")
    ? JSON.parse(localStorage.getItem("todaysFoods")!)
    : null,
};

// Creates the reducer function
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };
    case "USER_SIGNOUT":
      return {
        ...state,
        userInfo: null,
      };
    case "UPDATE_PICTURE_URL":
      return {
        ...state,
        userInfo: state.userInfo
          ? { ...state.userInfo, pictureURL: action.payload }
          : null,
      };
    case "REMOVE_PICTURE_URL":
      return {
        ...state,
        userInfo: state.userInfo ? { ...state.userInfo, pictureURL: "" } : null,
      };
    case "CREATE_HEALTH_DATA":
      localStorage.setItem("healthData", JSON.stringify(action.payload));
      return {
        ...state,
        healthData: action.payload,
        hasFilledHealthData: true,
      };
    case "REMOVE_HEALTH_DATA":
      localStorage.removeItem("healthData");
      return {
        ...state,
        healthData: null,
        hasFilledHealthData: false,
      };
    case "CREATE_PROFILE":
      localStorage.setItem("profile", JSON.stringify(action.payload));
      return {
        ...state,
        profile: action.payload,
      };
    case "REMOVE_PROFILE":
      localStorage.removeItem("profile");
      return {
        ...state,
        profile: null,
      };
    case "CREATE_ROUTINE":
      localStorage.setItem("routine", JSON.stringify(action.payload));
      return {
        ...state,
        routine: action.payload,
      };
    case "REMOVE_ROUTINE":
      localStorage.removeItem("routine");
      localStorage.removeItem("todaysFoods");
      return {
        ...state,
        routine: null,
        todaysFoods: null,
      };
    case "ASSIGN_TODAYS_FOODS":
      localStorage.setItem("todaysFoods", JSON.stringify(action.payload));
      return {
        ...state,
        todaysFoods: action.payload,
      };
    default:
      return state;
  }
};

// Creates the context
export const Store = createContext<
  { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

// Creates the provider component
export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}> {children} </Store.Provider>;
};
