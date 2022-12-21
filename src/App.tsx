import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOverview from "./pages/AdminOverview";
import Customer from "./pages/Customer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./styling/animations.scss";
import "./styling/custom.scss";
import "./styling/overrides.scss";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='customer/:id' element={<Customer />} />
        <Route path='admin' element={<AdminDashboard />} />
        <Route path='admin/overview' element={<AdminOverview />} />
      </Route>
    </Routes>
  );
};

export default App;
