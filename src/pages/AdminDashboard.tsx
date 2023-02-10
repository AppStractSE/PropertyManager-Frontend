import { motion } from "framer-motion";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useQuery } from "react-query";
import {
  AreaResponseDto,
  Chore,
  ChoreResponseDto,
  Client,
  CustomerResponseDto,
  Periodic,
  TeamResponseDto,
} from "../api/client";
import CustomerTeamCard from "../components/CustomerTeamCard";
import AddAreaModal from "../components/modals/AddAreaModal";
import { default as AddCustomerModal } from "../components/modals/AddCustomerModal";
import AddTeamModal from "../components/modals/AddTeamModal";
import AddCustomerChoreModal from "../components/modals/CustomerChore/AddCustomerChoreModal";

const AdminDashboard = () => {
  const [addAreaModal, showAddAreaModal] = useState(false);
  const [addTeamModal, showAddTeamModal] = useState(false);
  const [addCustomerModal, showAddCustomerModal] = useState(false);
  const [addCustomerChoreModal, showAddCustomerChoreModal] = useState(false);
  const client = new Client();

  // const fetchPeriodics = useAxios({ url: "/periodic", method: "get" });
  // const fetchChores = useAxios({ url: "/chore", method: "get" });

  const {
    data: areas,
    error: areasError,
    isLoading: areasLoading,
  } = useQuery<AreaResponseDto[]>(["areas"], async () => await client.area_GetAllAreas());
  const {
    data: teams,
    error: teamsError,
    isLoading: teamsLoading,
  } = useQuery<TeamResponseDto[]>(["teams"], async () => await client.team_GetAllTeams());
  const {
    data: customers,
    error: customersError,
    isLoading: customersLoading,
  } = useQuery<CustomerResponseDto[]>(
    ["customers"],
    async () => await client.customer_GetAllCustomers(),
  );
  const {
    data: periodics,
    error: periodicsError,
    isLoading: periodicsLoading,
  } = useQuery<Periodic[]>(["periodics"], async () => await client.periodic_GetAllPeriodics());
  const {
    data: chores,
    error: choresError,
    isLoading: choresLoading,
  } = useQuery<ChoreResponseDto[]>(["chores"], async () => await client.chore_GetAllChores());

  // const {
  //   data: chores,
  //   error: choresError,
  //   isLoading: choresLoading,
  // } = useQuery<Periodic>("chores", fetchChores);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Container className='mt-3 mb-3 d-flex gap-5'>
        <div className='customerWithTeamsContainer'>
          <div>Customers with teams</div>
          {customers?.map((customer) => (
            <CustomerTeamCard customer={customer} key={customer.id} />
          ))}
        </div>
        <div className='customerContainer'>
          <div>Customers</div>
          {customers?.map((customer) => (
            <div key={customer.id}>{customer.name}</div>
          ))}
          <Button onClick={() => showAddCustomerModal(true)}>Add customer</Button>
          <AddCustomerModal
            areas={areas}
            teams={teams}
            show={addCustomerModal}
            onHide={() => showAddCustomerModal(false)}
          />
        </div>

        <div className='teamContainer'>
          <div>Teams</div>
          {teams?.map((team) => (
            <div key={team.id}>{team.name}</div>
          ))}
          <Button onClick={() => showAddTeamModal(true)}>Add team</Button>
          <AddTeamModal show={addTeamModal} onHide={() => showAddTeamModal(false)} />
        </div>
        <div className='areaContainer'>
          <div>Areas</div>
          {areas?.map((area) => (
            <div key={area.id}>{area.name}</div>
          ))}
          <Button onClick={() => showAddAreaModal(true)}>Add area</Button>
          <AddAreaModal show={addAreaModal} onHide={() => showAddAreaModal(false)} />
        </div>

        <div className='customerContainer'>
          <div>Customer chores</div>
          {customers?.map((customer) => (
            <div key={customer.id}>{customer.name}</div>
          ))}
          <Button onClick={() => showAddCustomerChoreModal(true)}>Add customer chore</Button>
          <AddCustomerChoreModal
            customers={customers}
            periodics={periodics}
            chores={chores}
            show={addCustomerChoreModal}
            onHide={() => showAddCustomerChoreModal(false)}
          />
        </div>
      </Container>
    </motion.div>
  );
};

export default AdminDashboard;
