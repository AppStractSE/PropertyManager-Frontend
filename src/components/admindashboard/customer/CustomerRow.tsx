import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CustomerChoreResponseDto, CustomerResponseDto, Periodic, TeamMemberResponseDto, TeamResponseDto } from "../../../api/client";
import { useClient } from "../../../contexts/ClientContext";
import EditCustomerModal from "../modals/EditCustomerModal";

interface Props {
  customer: CustomerResponseDto;
  teams: TeamResponseDto[];
  teammembers: TeamMemberResponseDto[];
  customerchores: CustomerChoreResponseDto[];
  periodics: Periodic[];
}

const CustomerRow = ({ teams, customer, teammembers, customerchores, periodics }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const client = useClient();
  return (
    <tr>
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
        <Link to={`/customer/${customer.id}`} className='router-link'>
          <Button
          variant='outline-primary'
          size='sm'
          >
            Gå till
          </Button>
            </Link>
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
    </tr>
  );
};

export default CustomerRow;
