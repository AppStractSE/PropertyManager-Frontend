import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { useQueries } from "../../../hooks/useQueries";
import navMenu from "../data/navMenu";
import CreateArea from "./CreateArea";
import CreateChores from "./CreateChores";
import CreateCustomer from "./CreateCustomer";
import CreateTeam from "./CreateTeam";
import CreateUser from "./CreateUser";

const CreatePane = () => {
  const {
    areas,
    categories,
    cities,
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
    !cities ||
    !customers ||
    !customerchores ||
    !periodics ||
    !teamMembers ||
    !teams ||
    !users ||
    !userData
  )
    return null;
  const [tab, setTab] = useState("Kund");

  return (
    <Tab.Container defaultActiveKey='Kund'>
      <Nav
        variant='pills'
        className='flex-row w-100 justify-content-center gap-5 py-2 default-cursor border-bottom'
      >
        {navMenu.map((item) => (
          <Nav.Item key={item.name}>
            <Nav.Link eventKey={item.name} onClick={() => setTab(item.name)}>
              {item.name}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <Tab.Content>
        <Tab.Pane eventKey={tab}>
          <AnimatePresence mode='wait'>
            {tab === "Kund" && (
              <motion.div
                key='Kund'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CreateCustomer
                  cities={cities}
                  teams={teams}
                  areas={areas}
                  customers={customers}
                  users={users}
                />
              </motion.div>
            )}
            {tab === "Syssla" && (
              <motion.div
                key='Syssla'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CreateChores
                  categories={categories}
                  chores={chores}
                  customers={customers}
                  customerchores={customerchores}
                  periodics={periodics}
                />
              </motion.div>
            )}
            {tab === "Team" && (
              <motion.div
                key='Team'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CreateTeam teams={teams} users={users} teammembers={teamMembers} />
              </motion.div>
            )}
            {tab === "Användare" && (
              <motion.div
                key='Användare'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CreateUser users={users} teams={teams} />
              </motion.div>
            )}
            {tab === "Område" && (
              <motion.div
                key='Område'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CreateArea cities={cities} areas={areas} />
              </motion.div>
            )}
          </AnimatePresence>
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
};

export default CreatePane;
