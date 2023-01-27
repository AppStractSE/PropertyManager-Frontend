import { motion } from "framer-motion";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useQuery } from "react-query";
import { AreaResponseDto, CustomerResponseDto, TeamResponseDto } from "../api/client";
import CustomerTeamCard from "../components/CustomerTeamCard";
import AddAreaModal from "../components/modals/AddAreaModal";
import AddCustomerModal from "../components/modals/AddCustomerModal";
import AddTeamModal from "../components/modals/AddTeamModal";
import useAxios from "../hooks/useAxios";

const AdminDashboard = () => {
  const [addAreaModal, showAddAreaModal] = useState(false);
  const [addTeamModal, showAddTeamModal] = useState(false )
  const [addCustomerModal, showAddCustomerModal] = useState(false )
  const fetchAreas = useAxios({ url: "/area", method: "get" });
  const fetchCustomers = useAxios({ url: "/customer", method: "get" });
  const fetchTeams = useAxios({ url: "/team", method: "get" });

  const {
    data: areas,
    error: areasError,
    isLoading: areasLoading,
  } = useQuery<AreaResponseDto[]>("areas", fetchAreas);
  const {
    data: teams,
    error: teamsError,
    isLoading: teamsLoading,
  } = useQuery<TeamResponseDto[]>("teams", fetchTeams);
  const {
    data: customers,
    error: customersError,
    isLoading: customersLoading,
  } = useQuery<CustomerResponseDto[]>("customers", fetchCustomers);

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
          <AddCustomerModal areas={areas} teams={teams} show={addCustomerModal} onHide={() => showAddCustomerModal(false)}/>
          
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
      </Container>
    </motion.div>
  );
};

export default AdminDashboard;
