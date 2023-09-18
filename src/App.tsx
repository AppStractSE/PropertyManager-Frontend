import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Suspense, lazy } from "react";
import { Spinner } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "./contexts/ThemeContext";
import { InitialUserState, useUser } from "./contexts/UserContext";
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
  const { currentUser } = useUser();
  const { isDarkTheme } = useTheme();
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
