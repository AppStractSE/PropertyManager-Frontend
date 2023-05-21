import "bootstrap/dist/css/bootstrap.min.css";
import { Suspense, lazy } from "react";
import { Spinner } from "react-bootstrap";
import { useQuery } from "react-query";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthUser, TokenInfo } from "./api/client";
import { useClient } from "./contexts/ClientContext";
import { useTheme } from "./contexts/ThemeContext";
import { InitialUserState, useUser } from "./contexts/UserContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import "./styling/animations.scss";
import "./styling/custom.scss";
import "./styling/overrides.scss";

const Home = lazy(() => import("./pages/Home"));
const Customer = lazy(() => import("./pages/Customer"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminDashboard = lazy(() => import("./pages/dashboard/AdminDashboard"));
const CustomerChoreInfo = lazy(() => import("./components/CustomerChoreInfo"));

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
        }
      },
      // retryOnMount: true,
      onError: (error: any) => {
        setToken(InitialUserState.tokenInfo!);
        setCurrentUser(InitialUserState);
      },
    },
  );

  return (
    <>
      <Routes>
        {currentUser === InitialUserState ? (
          <Route
            index
            element={
              <Suspense
                fallback={
                  <div className='flex-fill justify-content-center align-items-center d-flex'>
                    <Spinner as='span' animation='border' />
                  </div>
                }
              >
                <Login />
              </Suspense>
            }
          />
        ) : (
          <>
            <Route
              index
              path='/*'
              element={
                currentUser.user?.role === "Admin" ? (
                  <Suspense
                    fallback={
                      <div className='flex-fill justify-content-center align-items-center d-flex'>
                        <Spinner as='span' animation='border' />
                      </div>
                    }
                  >
                    <AdminDashboard />
                  </Suspense>
                ) : (
                  <Suspense
                    fallback={
                      <div className='flex-fill justify-content-center align-items-center d-flex'>
                        <Spinner as='span' animation='border' />
                      </div>
                    }
                  >
                    <Home />
                  </Suspense>
                )
              }
            />
            <Route
              path='customer/:id'
              element={
                <Suspense
                  fallback={
                    <div className='flex-fill justify-content-center align-items-center d-flex'>
                      <Spinner as='span' animation='border' />
                    </div>
                  }
                >
                  <Customer />
                </Suspense>
              }
            />
            <Route
              path='customer/:id/chore/:customerChoreId'
              element={
                <Suspense
                  fallback={
                    <div className='flex-fill justify-content-center align-items-center d-flex'>
                      <Spinner as='span' animation='border' />
                    </div>
                  }
                >
                  <CustomerChoreInfo />
                </Suspense>
              }
            />
          </>
        )}
        <Route
          path='*'
          element={
            <Suspense
              fallback={
                <div className='flex-fill justify-content-center align-items-center d-flex'>
                  <Spinner as='span' animation='border' />
                </div>
              }
            >
              <NotFound />
            </Suspense>
          }
        />
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
