import { motion } from "framer-motion";
import { Nav, Tab } from "react-bootstrap";
import { AiOutlinePlus, AiOutlineTeam } from "react-icons/ai";
import { IoBriefcaseOutline } from "react-icons/io5";
import { RiTodoLine } from "react-icons/ri";
import AreaPane from "../components/admindashboard/area/AreaPane";
import ChorePane from "../components/admindashboard/chore/ChorePane";
import CreatePane from "../components/admindashboard/create/CreatePane";
import CustomerPane from "../components/admindashboard/customer/CustomerPane";
import TeamPane from "../components/admindashboard/team/TeamPane";
import { useQueries } from "../hooks/useQueries";

const AdminDashboard = () => {
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
          <Nav.Item>
            <Nav.Link eventKey='fourth' className='d-flex align-items-center gap-4'>
              <AiOutlinePlus size={24} />
              <div>Områden</div>
            </Nav.Link>
          </Nav.Item>
          <hr className='navbar-divider px-4 my-4 opacity-70'></hr>
          <Nav.Item>
            <Nav.Link eventKey='fifth' className='d-flex align-items-center gap-4'>
              <AiOutlinePlus size={24} />
              <div>Skapa</div>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className='flex-fill col-xl-10 col-lg-9 col-sm-12'>
          <Tab.Pane className='m-5' eventKey='first'>
            <CustomerPane
              areas={areas}
              chores={chores}
              customers={customers}
              customerchores={customerChores}
              periodics={periodics}
              teams={teams}
              teammembers={teamMembers}
              users={users}
            />
          </Tab.Pane>
          <Tab.Pane className='m-5' eventKey='second'>
            <TeamPane teams={teams} teammembers={teamMembers} users={users} customers={customers} />
          </Tab.Pane>
          <Tab.Pane className='m-5' eventKey='third'>
            <ChorePane
              customers={customers}
              chores={chores}
              periodics={periodics}
              categories={categories}
            />
          </Tab.Pane>
          <Tab.Pane className='m-5' eventKey='fourth'>
            <AreaPane areas={areas} />
          </Tab.Pane>
          <Tab.Pane eventKey='fifth'>
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
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </motion.div>
  );
};

export default AdminDashboard;
