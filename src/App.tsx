import "bootstrap/dist/css/bootstrap.min.css";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Client } from "./api/client";
import { InitialUserState, useUser } from "./contexts/UserContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Layout from "./Layout";
import { TokenInfo } from "./models/TokenInfo";
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
  const [token, setToken] = useLocalStorage<TokenInfo>("token", InitialUserState.tokenInfo);

  useEffect(() => {
    if (token && currentUser === InitialUserState) {
      if (token?.token !== "") {
        // fetchValidatedUser();
      }
    }
  }, [token]);

  useEffect(() => {
    if (currentUser !== InitialUserState) {
      if (currentUser.tokenInfo?.token) {
        setToken(currentUser.tokenInfo);
      }
    }
  }, [currentUser]);

  // const { data: fetchedUser } = useQuery<User>(["user", currentUser.userId], async () =>
  //   client.authenticate_GetValidation(token.token));

  // const { mutateAsync: fetchValidatedUser } = useMutation(
  //   async () => {
  //     return await axiosClient.get(`/Authenticate/validation`, {
  //       headers: {
  //         Authorization: `Bearer ${token.token}`,
  //       },
  //     });
  //   },
  //   {
  //     onSuccess: ({ data }) => {
  //       setCurrentUser({
  //         userName: data.userName,
  //         userId: data.userId,
  //         displayName: data.displayName,
  //         tokenInfo: data.tokenInfo,
  //       } as User);
  //     },
  //     onError: (error) => {
  //       console.log(error);
  //     },
  //   },
  // );

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
    // </QueryClientProvider>
  );
};

export default App;
