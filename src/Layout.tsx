import { AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import AppBar from "./components/AppBar";
const Layout = () => {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <AppBar />

        <Outlet />

    </>
  );
};

export default Layout;
