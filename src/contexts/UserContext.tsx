import React from "react";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { useQueryClient } from "react-query";
import { AuthUser, TokenInfo } from "../api/client";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface UserContext {
  authenticated: boolean;
  currentUser: AuthUser;
  setCurrentUser: Dispatch<SetStateAction<AuthUser>>;
  token: TokenInfo;
  setToken: Dispatch<SetStateAction<TokenInfo>>;
  logout: () => void;
  login: () => void;
}

const UserContext = createContext<UserContext>({
  authenticated: false,
  currentUser: ({} as AuthUser) || undefined,
  setCurrentUser: () => console.warn("No user provider"),
  token: {} as TokenInfo,
  setToken: () => console.warn("No user provider"),
  logout: () => console.warn("No user provider"),
  login: () => console.warn("No user provider"),
});

interface Props {
  children: ReactNode;
}

const InitialDate = new Date(0, 0, 0, 0, 0, 0, 0);

export const InitialUserState: AuthUser = {
  user: {
    role: "",
    userName: "",
    userId: "",
    displayName: "",
  },
  tokenInfo: {
    token: "",
    expiration: InitialDate,
  },
};

function UserProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<AuthUser>(InitialUserState);
  const [token, setToken] = useLocalStorage<TokenInfo>(
    "token",
    InitialUserState.tokenInfo as TokenInfo,
  );
  const queryClient = useQueryClient();
  const [authenticated, setAuthenticated] = useState(
    Boolean(token && token.token !== InitialUserState.tokenInfo),
  );

  const logout = () => {
    setCurrentUser(InitialUserState);
    window.localStorage.setItem("token", JSON.stringify(InitialUserState.tokenInfo));
    queryClient.removeQueries();
    setAuthenticated(false);
  };

  const login = () => {
    setAuthenticated(true);
  };

  return (
    <UserContext.Provider
      value={{ authenticated, login, currentUser, setCurrentUser, logout, token, setToken }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);

export default UserProvider;
