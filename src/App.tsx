import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useLayoutEffect } from "react";
import { useQuery } from "react-query";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthUser, TokenInfo } from "./api/client";
import AppBar from "./components/AppBar";
import CustomerChoreInfo from "./components/CustomerChoreInfo";
import { useClient } from "./contexts/ClientContext";
import { useTheme } from "./contexts/ThemeContext";
import UserProvider, { InitialUserState, useUser } from "./contexts/UserContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import AdminDashboard from "./pages/AdminDashboard";
import Customer from "./pages/Customer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import "./styling/animations.scss";
import "./styling/custom.scss";
import "./styling/overrides.scss";
import { set } from "date-fns";

const App = () => {
  const client = useClient();
  const { currentUser, setCurrentUser } = useUser();
  const { isDarkTheme } = useTheme();
  const [token, setToken] = useLocalStorage<TokenInfo>("token", InitialUserState.tokenInfo!);
  const navigate = useNavigate();

  const fetchUser = async () => {
    if (token.token !== InitialUserState.tokenInfo?.token) {
      return await client.authenticate_GetValidation();
    } else {
      return InitialUserState;
    }
  };

  const { data: fetchedUser, refetch } = useQuery<AuthUser>(
    ["user", currentUser?.user?.userId],
    fetchUser,
    {
      enabled: token.token !== "",
      // enabled: token.token !== "",
      retry(failureCount, error: any) {
        if (error.status === 500) {
          return false;
        }
        return failureCount < 1;
      },
      onSuccess: (data) => {
        if (data) {
          const user: AuthUser = data;
          setCurrentUser(user);
          navigate("/"); // Redirect to the authenticated section after successful login
        }
      },
      retryOnMount: true,
      onError: (error: any) => {
        setToken(InitialUserState.tokenInfo!);
        setCurrentUser(InitialUserState);
      },
    },
  );

  // useEffect(() => {
  //   if (token !== InitialUserState.tokenInfo || currentUser !== InitialUserState) {
  //     console.log("Setting user from token");
  //     setCurrentUser((prevUser) => ({
  //       ...prevUser,
  //       tokenInfo: token,
  //     }));
  //   }
  // }, [token, setCurrentUser]);

  // useEffect(() => {
  //   if (currentUser !== InitialUserState || token.token === InitialUserState.tokenInfo?.token) {
  //     if (currentUser.tokenInfo) {
  //       console.log("Setting token from currentUser");
  //       setToken(currentUser.tokenInfo);
  //     }
  //   }
  // }, [currentUser, token]);

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
