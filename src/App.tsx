import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthUser, TokenInfo } from "./api/client";
import AppBar from "./components/AppBar";
import CustomerChoreInfo from "./components/CustomerChoreInfo";
import { useClient } from "./contexts/ClientContext";
import { useTheme } from "./contexts/ThemeContext";
import { InitialUserState, useUser } from "./contexts/UserContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import AdminDashboard from "./pages/AdminDashboard";
import Customer from "./pages/Customer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import "./styling/animations.scss";
import "./styling/custom.scss";
import "./styling/overrides.scss";
const App = () => {
  const client = useClient();
  const { currentUser, setCurrentUser } = useUser();
  const { isDarkTheme } = useTheme();
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
    <>
      <Routes>
        {currentUser === InitialUserState ? (
          <Route index element={<Login />} />
        ) : (
          <>
            <Route
              index
              element={
                currentUser.user?.role === "Admin" ? (
                  <>
                    <AppBar />
                    <AdminDashboard />
                  </>
                ) : (
                  <Home />
                )
              }
            />
            <Route path='customer/:id' element={<Customer />} />
            <Route path='customer/:id/chore/:customerChoreId' element={<CustomerChoreInfo />} />
          </>
        )}
        <Route path='*' element={<NotFound />} />
      </Routes>
      {/* Default toast */}
      <ToastContainer
        position={window.innerWidth > 768 ? "top-right" : "top-center"}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkTheme ? "dark" : "light"}
      />
    </>
  );
};

export default App;
