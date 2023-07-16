import { Outlet } from "react-router";
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <div className='d-flex flex-wrap admin-nav'>
      <Navigation />
      <div className='col-12 col-lg-10 content'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
