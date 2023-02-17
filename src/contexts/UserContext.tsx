import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
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
  currentUser: {} as AuthUser,
  setCurrentUser: () => console.warn("No user provider"),
  token: {} as TokenInfo,
  setToken: () => console.warn("No user provider"),
  logout: () => console.warn("No user provider"),
});

interface Props {
  children: ReactNode;
}

export const InitialDate = new Date(0, 0, 0, 0, 0, 0, 0);

export const InitialUserState: AuthUser = {
  user: {
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
  const [token, setToken] = useLocalStorage<TokenInfo>("token", InitialUserState.tokenInfo);

  const logout = () => {
    setToken({ token: "", expiration: InitialDate });
    setCurrentUser(InitialUserState);
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, logout, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);

export default UserProvider;
