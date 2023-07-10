import { Outlet } from "react-router";
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <div className='d-flex flex-wrap admin-nav'>
      <Navigation />
      <div className='col-sm-12 col-lg-10 py-3 px-3 overflow-hidden'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
