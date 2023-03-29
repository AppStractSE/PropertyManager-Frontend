import { useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import CreatePane from "../components/admindashboard/create/CreatePane";
import CurrentTabPane from "../components/admindashboard/CurrentTabPane";
import dashboardData from "../components/admindashboard/data/dashboardData";
import { useQueries } from "../hooks/useQueries";

const AdminDashboard = () => {
  const [tab, setTab] = useState("Kunder");
  const {
    areas,
    categories,
    chores,
    customers,
    customerChores,
    periodics,
    teamMembers,
    teams,
    users,
  } = useQueries();
  if (
    !areas ||
    !categories ||
    !chores ||
    !customers ||
    !customerChores ||
    !periodics ||
    !teamMembers ||
    !teams ||
    !chores ||
    !users
  )
    return null;

  return (
    <Tab.Content className='d-flex flex-wrap cflex-fill'>
      <Tab.Container defaultActiveKey='Kunder'>
        <Nav
          variant='pills'
          className='d-flex flex-column py-5 px-3 col-12 col-xl-2 col-lg-3 col-sm-12 aside-nav'
        >
          {dashboardData.map((item, i) => (
            <>
              <Nav.Item>
                <Nav.Link
                  eventKey={item.eventKey}
                  onClick={() => setTab(item.eventKey)}
                  className='d-flex align-items-center gap-4'
                >
                  {<item.icon size={24} />}
                  <div>{item.name}</div>
                </Nav.Link>
              </Nav.Item>
              {i === dashboardData.length - 2 ? (
                <hr className='navbar-divider px-4 my-4 opacity-70'></hr>
              ) : undefined}
            </>
          ))}
        </Nav>
        <Tab.Content className='flex-fill col-xl-10 col-lg-9 col-sm-12'>
          <Tab.Pane className={tab === "Skapa" ? "" : "m-5"} eventKey={tab}>
            {tab === "Skapa" ? (
              <CreatePane
                areas={areas}
                categories={categories}
                chores={chores}
                customers={customers}
                customerchores={customerChores}
                periodics={periodics}
                teams={teams}
                teammembers={teamMembers}
                users={users}
              />
            ) : (
              <CurrentTabPane
                tab={tab}
                areas={areas}
                chores={chores}
                customers={customers}
                customerchores={customerChores}
                periodics={periodics}
                teams={teams}
                teammembers={teamMembers}
                users={users}
              />
            )}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Tab.Content>
  );
};

export default AdminDashboard;
