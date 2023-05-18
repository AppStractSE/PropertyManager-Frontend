import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Container, Nav, Tab } from "react-bootstrap";
import {
  AreaResponseDto,
  CategoryResponseDto,
  ChoreResponseDto,
  CustomerChoreResponseDto,
  CustomerResponseDto,
  Periodic,
  TeamMemberResponseDto,
  TeamResponseDto,
  UserInfoDto
} from "../../../api/client";
import navMenu from "../data/navMenu";
import CreateArea from "./CreateArea";
import CreateChores from "./CreateChores";
import CreateCustomer from "./CreateCustomer";
import CreateTeam from "./CreateTeam";
import CreateUser from "./CreateUser";

interface Props {
  areas: AreaResponseDto[];
  categories: CategoryResponseDto[];
  chores: ChoreResponseDto[];
  customers: CustomerResponseDto[];
  customerchores: CustomerChoreResponseDto[];
  periodics: Periodic[];
  teams: TeamResponseDto[];
  teammembers: TeamMemberResponseDto[];
  users: UserInfoDto[];
}

const variants = {
  enter: {
    opacity: 0,
  },
  center: {
    zIndex: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    zIndex: 0,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const CreatePane = ({
  areas,
  categories,
  chores,
  customers,
  customerchores,
  periodics,
  teams,
  teammembers,
  users,
}: Props) => {
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
      <Container>
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
                  <CreateCustomer teams={teams} areas={areas} customers={customers} users={users} />
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
                  <CreateTeam teams={teams} users={users} teammembers={teammembers} />
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
                  <CreateArea areas={areas} />
                </motion.div>
              )}
            </AnimatePresence>
          </Tab.Pane>
        </Tab.Content>
      </Container>
    </Tab.Container>
  );
};

export default CreatePane;
