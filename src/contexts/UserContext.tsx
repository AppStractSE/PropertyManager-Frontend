import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { TokenInfo } from "../models/TokenInfo";
import { User } from "../models/User";

interface UserContext {
  currentUser: User;
  setCurrentUser: Dispatch<SetStateAction<User>>;
  setToken: Dispatch<SetStateAction<TokenInfo>>;
  token: TokenInfo;
  logout: () => void;
}

const UserContext = createContext<UserContext>({
  setToken: () => console.warn("No user provider"),
  currentUser: {} as User,
  token: {} as TokenInfo,
  setCurrentUser: () => console.warn("No user provider"),
  logout: () => console.warn("No user provider"),
});

interface Props {
  children: ReactNode;
}

function UserProvider({ children }: Props) {
  const [token, setToken] = useLocalStorage<TokenInfo>("token", {} as TokenInfo);
  const [currentUser, setCurrentUser] = useState<User>({} as User);

  const logout = () => {
    setCurrentUser({} as User);
    setToken({} as TokenInfo);
  };

  return (
    <UserContext.Provider value={{ currentUser, token, setToken, setCurrentUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);

export default UserProvider;
