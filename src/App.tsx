import "bootstrap/dist/css/bootstrap.min.css";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Route, Routes } from "react-router-dom";
import { AuthUser, Client, TokenInfo } from "./api/client";
import { InitialUserState, useUser } from "./contexts/UserContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Layout from "./Layout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOverview from "./pages/AdminOverview";
import AdminRegisterChore from "./pages/AdminRegisterChore";
import Customer from "./pages/Customer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import "./styling/animations.scss";
import "./styling/custom.scss";
import "./styling/overrides.scss";

const App = () => {
  const client = new Client();
  const { currentUser, setCurrentUser } = useUser();
  const [token, setToken] = useLocalStorage<TokenInfo>("token", InitialUserState.tokenInfo!);

  const { data: fetchedUser } = useQuery<AuthUser>(
    ["user", currentUser?.user?.userId],
    async () => {
      return token.token !== InitialUserState.tokenInfo?.token
        ? await client.authenticate_GetValidation()
        : InitialUserState;
    },
    {
      onSuccess: (data) => {
        if (data) {
          const user: AuthUser = data;
          setCurrentUser(user);
        }
      },
      onError: (error) => {
        console.log(error);
      },
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    if (token !== InitialUserState.tokenInfo) {
      setCurrentUser({ ...currentUser, tokenInfo: token });
    }
  }, [token]);

  useEffect(() => {
    if (currentUser !== InitialUserState) {
      if (currentUser.tokenInfo?.token !== "") {
        setToken(currentUser.tokenInfo!);
      }
    }
  }, [currentUser]);

  return (
    <AnimatePresence mode='wait'>
      <Routes>
        <Route path='/' element={<Layout />}>
          {currentUser === InitialUserState ? (
            <Route index element={<Login />} />
          ) : (
            <>
              <Route index element={<Home />} />
              <Route path='customer/:id' element={<Customer />} />
              <Route path='admin' element={<AdminDashboard />} />
              <Route path='admin/overview' element={<AdminOverview />} />
              <Route path='admin/register' element={<AdminRegisterChore />} />
            </>
          )}
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default App;
