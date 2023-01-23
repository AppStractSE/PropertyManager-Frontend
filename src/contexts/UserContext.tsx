import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { User } from "../models/User";

interface UserContext {
  currentUser: User;
  setCurrentUser: Dispatch<SetStateAction<User>>;
  logout: () => void;
}

const UserContext = createContext<UserContext>({
  currentUser: {} as User,
  setCurrentUser: () => console.warn("No user provider"),
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

  const logout = () => {
    setCurrentUser(InitialUserState);
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);

export default UserProvider;
