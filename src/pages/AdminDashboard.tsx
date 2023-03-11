import { motion } from "framer-motion";
import { useState } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { AiOutlinePlus, AiOutlineTeam } from "react-icons/ai";
import { IoBriefcaseOutline } from "react-icons/io5";
import { RiTodoLine } from "react-icons/ri";
import AddCustomerChore from "../components/admindashboard/AddCustomerChore";
import AddChore from "../components/admindashboard/chore/AddChore";
import AddCustomer from "../components/admindashboard/customer/AddCustomer";
import CustomerTable from "../components/admindashboard/customer/CustomerTable";
import AddTeam from "../components/admindashboard/team/AddTeam";
import Team from "../components/admindashboard/team/Team";
import { useQueries } from "../hooks/useQueries";
const AdminDashboard = () => {
  const [addAreaModal, showAddAreaModal] = useState(false);
  const [addCustomerModal, showAddCustomerModal] = useState(false);
  const [addCustomerChoreModal, showAddCustomerChoreModal] = useState(false);

  const {
    areas,
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
    !chores ||
    !customers ||
    !customerChores ||
    !periodics ||
    !teamMembers ||
    !teams ||
    !users
  ) return null;

  return (
    <motion.div
      className='d-flex'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Container className='p-3'>
        <Tab.Container defaultActiveKey='first'>
          <Row>
            <Col sm={12} md={12} lg={2}>
              <Nav variant='pills' className='flex-column'>
                <Nav.Item>
                  <Nav.Link eventKey='first' className='d-flex align-items-center gap-4'>
                    <IoBriefcaseOutline size={24} />
                    <div>Kunder</div>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='second' className='d-flex align-items-center gap-4'>
                    <AiOutlineTeam size={24} />
                    <div>Teams</div>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='third' className='d-flex align-items-center gap-4'>
                    <RiTodoLine size={24} />
                    <div>Sysslor</div>
                  </Nav.Link>
                </Nav.Item>
                <hr className='navbar-divider px-4 my-4 opacity-70'></hr>
                <Nav.Item>
                  <Nav.Link eventKey='fourth' className='d-flex align-items-center gap-4'>
                    <AiOutlinePlus size={24} />
                    <div>Skapa</div>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={12} md={12} lg={12 - 2}>
              <Tab.Content>
                <Tab.Pane eventKey='first'>
                  <div className='fs-4 mb-2'>Kundöversikt</div>
                  <CustomerTable
                    periodics={periodics}
                    customerchores={customerChores}
                    customers={customers}
                    teams={teams}
                    teammembers={teamMembers}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey='second'>
                  <Team teams={teams} teammembers={teamMembers} users={users} />
                </Tab.Pane>
                <Tab.Pane eventKey='third'>
                  <Container></Container>
                </Tab.Pane>
                <Tab.Pane eventKey='fourth'>
                  <Container>
                    <Tab.Container defaultActiveKey='first'>
                      <Nav variant='pills' className='flex-row'>
                        <Nav.Item>
                          <Nav.Link eventKey='first'>Kund</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey='second'>Syssla</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey='third'>Team</Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Col>
                        <Tab.Content>
                          <Tab.Pane eventKey='first'>
                            <div className='fs-4 mb-3 mt-3'>Skapa kund</div>
                            <AddCustomer teams={teams} areas={areas} />
                          </Tab.Pane>
                          <Tab.Pane eventKey='second'>
                            <div className='fs-4 mb-3 mt-3'>Skapa syssla</div>
                            <AddChore />
                            <div className='fs-4 mb-3 mt-3'>Skapa kundsyssla</div>
                            <AddCustomerChore
                              customers={customers}
                              periodics={periodics}
                              chores={chores}
                            />
                          </Tab.Pane>
                          <Tab.Pane eventKey='third'>
                            <div className='fs-4 mb-3 mt-3'>Skapa team</div>
                            <AddTeam users={users} teammembers={teamMembers} />
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Tab.Container>
                  </Container>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </motion.div>
  );
};

export default AdminDashboard;
