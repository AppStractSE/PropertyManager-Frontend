import { motion } from "framer-motion";
import { Col, Container, Nav, Tab } from "react-bootstrap";
import { AiOutlinePlus, AiOutlineTeam } from "react-icons/ai";
import { IoBriefcaseOutline } from "react-icons/io5";
import { RiTodoLine } from "react-icons/ri";
import AddCustomerChore from "../components/admindashboard/AddCustomerChore";
import AddChore from "../components/admindashboard/chore/AddChore";
import AddCustomer from "../components/admindashboard/customer/AddCustomer";
import CustomerTable from "../components/admindashboard/customer/CustomerTable";
import AddTeam from "../components/admindashboard/team/AddTeam";
import Team from "../components/admindashboard/team/Team";
import AddUser from "../components/admindashboard/user/AddUser";
import { useUser } from "../contexts/UserContext";
import { useQueries } from "../hooks/useQueries";
const AdminDashboard = () => {
  const { currentUser } = useUser();
  const { areas, chores, customers, customerChores, periodics, teamMembers, teams, users } =
    useQueries();
  if (
    !areas ||
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
    <motion.div
      className='d-flex flex-wrap cflex-fill'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Tab.Container defaultActiveKey='first'>
        <Nav
          variant='pills'
          className='d-flex flex-column py-5 px-3 col-12 col-xl-2 col-lg-3 col-sm-12 aside-nav'
        >
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
        <Tab.Content className='flex-fill ps-4 pe-3 py-5 col-xl-10 col-lg-9 col-sm-12'>
          <Tab.Pane eventKey='first'>
            <div className='fs-4 mb-2'>Kundöversikt</div>
            <CustomerTable
              periodics={periodics}
              customerchores={customerChores}
              customers={customers}
              teams={teams}
              teammembers={teamMembers}
              chores={chores}
            />
          </Tab.Pane>
          <Tab.Pane eventKey='second'>
            <Team teams={teams} teammembers={teamMembers} users={users} customers={customers} />
          </Tab.Pane>
          <Tab.Pane eventKey='third'>
            <Container></Container>
          </Tab.Pane>
          <Tab.Pane eventKey='fourth'>
            <div>
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
                  <Nav.Item>
                    <Nav.Link eventKey='fourth'>Användare</Nav.Link>
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
                    <Tab.Pane eventKey='fourth'>
                      <div className='fs-4 mb-3 mt-3'>Skapa användare</div>
                      <AddUser users={users} teams={teams} />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Tab.Container>
            </div>
          </Tab.Pane>
        </Tab.Content>
        {/* </Col> */}
      </Tab.Container>
    </motion.div>
  );
};

export default AdminDashboard;
