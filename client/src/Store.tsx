import React, { createContext, useReducer, ReactNode } from "react";

// Defines the interface for user data
interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

// Defines the shape of the state
interface State {
  userInfo: UserInfo | null;
}

// Defines the action types
type Action =
  | { type: "USER_SIGNIN"; payload: UserInfo }
  | { type: "USER_SIGNOUT" };

// Creates initial state by checking localStorage
const initialState: State = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
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
    default:
      return state;
  }
}

// Creates the context
export const Store = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

// Creates the provider component
export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}> {children} </Store.Provider>;
}
