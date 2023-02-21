import { useState } from "react";
import { Button } from "react-bootstrap";
import { useQueryClient } from "react-query";
import {
  Client,
  CustomerChoreResponseDto,
  CustomerResponseDto,
  TeamMemberResponseDto,
  TeamResponseDto,
  Periodic

} from "../../../api/client";
import EditCustomerModal from "../modals/EditCustomerModal";

interface Props {
  customer: CustomerResponseDto;
  teams: TeamResponseDto[];
  teammembers: TeamMemberResponseDto[];
  customerchores: CustomerChoreResponseDto[];
  periodics: Periodic[];
}

const CustomerRow = ({ teams, customer, teammembers, customerchores, periodics }: Props) => {
  const [rowIsDisabled, setRowIsDisabled] = useState(true);
  const [team, setTeam] = useState(customer.teamId);
  const [customerName, setCustomerName] = useState(customer.name);
  const [customerAddress, setCustomerAddress] = useState(customer.address);
  const [showModal, setShowModal] = useState(false);
  const client = new Client();
  const queryClient = useQueryClient();
  const customerObject = {
    id: customer.id,
    name: customerName,
    address: customerAddress,
    teamId: team,
    areaId: customer.areaId,
  };

  return (
    <>
      <td>{customer.name}</td>
      <td>{customer.address}</td>
      <td>{teams.filter((team) => team.id === customer.teamId).map((team) => team.name)}</td>
      <td>{customerchores.filter((customerchore) => customerchore.customerId === customer.id).length}</td>
      <td>
        <Button
          className='me-2'
          variant='outline-primary'
          size='sm'
          onClick={() => setShowModal(!showModal)}
        >
          Visa mer
        </Button>
        {!rowIsDisabled && (
          <Button
            variant='outline-primary'
            size='sm'
            onClick={() => console.log("Delete customer")}
          >
            Radera
          </Button>
        )}
      </td>
      <EditCustomerModal
        show={showModal}
        onHide={() => setShowModal(false)}
        customer={customer}
        teams={teams}
        teammembers={teammembers}
        customerchores={customerchores}
        periodics={periodics}
      />
    </>
  );
};

export default CustomerRow;
