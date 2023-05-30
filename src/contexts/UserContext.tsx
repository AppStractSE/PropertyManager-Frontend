import React from "react";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { useQueryClient } from "react-query";
import { AuthUser, TokenInfo } from "../api/client";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface UserContext {
  currentUser: AuthUser;
  setCurrentUser: Dispatch<SetStateAction<AuthUser>>;
  token: TokenInfo;
  setToken: Dispatch<SetStateAction<TokenInfo>>;
  logout: () => void;
}

const UserContext = createContext<UserContext>({
  currentUser: ({} as AuthUser) || undefined,
  setCurrentUser: () => console.warn("No user provider"),
  token: {} as TokenInfo,
  setToken: () => console.warn("No user provider"),
  logout: () => console.warn("No user provider"),
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
  const [token, setToken] = useLocalStorage<TokenInfo>("token", InitialUserState.tokenInfo!);
  const queryClient = useQueryClient();

  const logout = () => {
    setCurrentUser(InitialUserState);
    window.localStorage.setItem("token", JSON.stringify(InitialUserState.tokenInfo!));
    queryClient.removeQueries();
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, logout, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);

export default UserProvider;
