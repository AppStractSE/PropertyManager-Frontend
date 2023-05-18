import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import CurrentTabPane from "../components/admindashboard/CurrentTabPane";
import CreatePane from "../components/admindashboard/create/CreatePane";
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
    userData,
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
    !users ||
    !userData
  )
    return null;

  return (
    <Tab.Content className='d-flex flex-wrap cflex-fill'>
      <Tab.Container defaultActiveKey='Kunder'>
        <Nav
          variant='pills'
          className='d-flex flex-column py-5 px-3 col-12 col-xl-2 col-lg-3 col-sm-12 aside-nav overflow-auto'
        >
          {dashboardData.map((item, i) => (
            <motion.div
              className=''
              key={item.eventKey}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: i * 0.2 }}
            >
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
              ) : null}
            </motion.div>
          ))}
        </Nav>
        <Tab.Content
          className='flex-fill col-xl-10 col-lg-9 col-sm-12'
          style={{ maxWidth: "100%" }}
        >
          <AnimatePresence mode='wait'>
            <motion.div
              key={tab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={tab === "Skapa" ? "" : "my-5"}
              style={{ overflow: "hidden" }}
            >
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
            </motion.div>
          </AnimatePresence>
        </Tab.Content>
      </Tab.Container>
    </Tab.Content>
  );
};

export default AdminDashboard;
