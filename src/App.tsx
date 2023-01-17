import "bootstrap/dist/css/bootstrap.min.css";
import { AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import { useUser } from "./contexts/userContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Layout from "./Layout";
import { TokenInfo } from "./models/TokenInfo";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOverview from "./pages/AdminOverview";
import Customer from "./pages/Customer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import "./styling/animations.scss";
import "./styling/custom.scss";
import "./styling/overrides.scss";

const App = () => {
  const Authenticated = () => {
    const { token, setToken } = useUser();
    const [storageToken] = useLocalStorage<TokenInfo>("token", {} as TokenInfo);

    if (token?.token) {
      return true;
    }
    if (storageToken.token) {
      setToken(storageToken);
      return true;
    } else {
      return false;
    }
  };
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode='wait'>
        <Routes>
          <Route path='/' element={<Layout />}>
            {!Authenticated() ? (
              <Route index element={<Login />} />
            ) : (
              <>
                <Route index element={<Home />} />
                <Route path='customer/:id' element={<Customer />} />
                <Route path='admin' element={<AdminDashboard />} />
                <Route path='admin/overview' element={<AdminOverview />} />
              </>
            )}
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </QueryClientProvider>
  );
};

export default App;
