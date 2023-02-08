import "bootstrap/dist/css/bootstrap.min.css";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { Route, Routes } from "react-router-dom";
import { InitialUserState, useUser } from "./contexts/UserContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Layout from "./Layout";
import { TokenInfo } from "./models/TokenInfo";
import { User } from "./models/User";
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
import axiosClient from "./utils/axiosClient";

const App = () => {
  const { currentUser, setCurrentUser } = useUser();
  const [token, setToken] = useLocalStorage<TokenInfo>("token", InitialUserState.tokenInfo);

  useEffect(() => {
    if (token && currentUser === InitialUserState) {
      if (token?.token !== "") {
        fetchValidatedUser();
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

  const { mutateAsync: fetchValidatedUser } = useMutation(
    async () => {
      return await axiosClient.get(`/Authenticate/validation`, {
        // TODO: Replace with endSwagger
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
    },
    {
      onSuccess: ({ data }) => {
        // TODO: Invalidate?
        setCurrentUser({
          userName: data.userName,
          userId: data.userId,
          displayName: data.displayName,
          tokenInfo: data.tokenInfo,
        } as User);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  // const queryClient = new QueryClient();

  return (
    // <QueryClientProvider client={queryClient}>
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
