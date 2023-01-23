import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { TokenInfo } from "../models/TokenInfo";
import { User } from "../models/User";

interface UserContext {
  currentUser: User;
  setCurrentUser: Dispatch<SetStateAction<User>>;
  token: TokenInfo;
  setToken: Dispatch<SetStateAction<TokenInfo>>;
  logout: () => void;
}

const UserContext = createContext<UserContext>({
  currentUser: {} as User,
  setCurrentUser: () => console.warn("No user provider"),
  token: {} as TokenInfo,
  setToken: () => console.warn("No user provider"),
  logout: () => console.warn("No user provider"),
});

interface Props {
  children: ReactNode;
}

export const InitialUserState = {
  userName: "",
  userId: "",
  displayName: "",
  tokenInfo: {
    token: "",
    expiration: "",
  },
};

function UserProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<User>(InitialUserState);
  const [token, setToken] = useLocalStorage<TokenInfo>("token", InitialUserState.tokenInfo);

  const logout = () => {
    setCurrentUser(InitialUserState);
    setToken((prev) => ({ ...prev, token: "", expiration: "" }));
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, logout, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);

export default UserProvider;
