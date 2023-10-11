import { Suspense } from "react";
import { Spinner } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import CreatePane from "../../components/admindashboard/create/CreatePane";
import { useQueries } from "../../hooks/useQueries";
import NotFound from "../NotFound";
import Layout from "./Layout";
import ChoreTab from "./tabs/ChoreTab";
import CustomerTab from "./tabs/CustomerTab";
import Overview from "./tabs/Overview";
import TeamsTab from "./tabs/TeamsTab";
import ReportTab from "./tabs/ReportTab";
import Meeting from "./tabs/Meeting";

const AdminDashboard = () => {
  const {
    areas,
    categories,
    chores,
    customers,
    customerchores,
    periodics,
    teamMembers,
    teams,
    users,
    userData,
  } = useQueries();
  if (
    !areas ||
    !categories ||
    !chores ||
    !customers ||
    !customerchores ||
    !periodics ||
    !teamMembers ||
    !teams ||
    !users ||
    !userData
  )
    return null;
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path='report/create' element={<div>sdadasdsadasdasad</div>} />
          <Route path='meeting' element={<Meeting />} />

          <Route
            path='customer'
            element={
              <CustomerTab
                areas={areas}
                chores={chores}
                customers={customers}
                customerchores={customerchores}
                periodics={periodics}
                teams={teams}
                teammembers={teamMembers}
              />
            }
          />
          <Route
            path='teams'
            element={
              <TeamsTab
                teams={teams}
                teammembers={teamMembers}
                users={users}
                customers={customers}
              />
            }
          />
          <Route path='chores' element={<ChoreTab categories={categories} chores={chores} />} />
          <Route path='create' element={<CreatePane />} />
          <Route path='report' element={<ReportTab />} />
        </Route>
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
    </>
  );
};

export default AdminDashboard;
