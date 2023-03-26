import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  AreaResponseDto,
  ChoreResponseDto,
  CustomerChoreResponseDto,
  CustomerResponseDto,
  Periodic,
  TeamMemberResponseDto,
  TeamResponseDto,
} from "../../../../api/client";
import EditCustomerModal from "../edit/EditCustomerModal";

interface Props {
  customer: CustomerResponseDto;
  teams: TeamResponseDto[];
  teammembers: TeamMemberResponseDto[];
  customerchores: CustomerChoreResponseDto[];
  periodics: Periodic[];
  chores: ChoreResponseDto[];
  areas: AreaResponseDto[];
}

const CustomerRow = ({
  teams,
  customer,
  teammembers,
  customerchores,
  periodics,
  chores,
  areas,
}: Props) => {
  const [customerModal, setShowCustomerModal] = useState(false);
  return (
    <tr>
      <td>{customer.name}</td>
      <td>{customer.address}</td>
      <td>{areas.filter((area) => area.id === customer.areaId).map((area) => area.name)}</td>
      <td>{teams.filter((team) => team.id === customer.teamId).map((team) => team.name)}</td>
      <td>
        {customerchores.filter((customerchore) => customerchore.customerId === customer.id).length}{" "}
        st
      </td>
      <td>
        <Button
          className='me-2'
          variant='outline-primary'
          size='sm'
          onClick={() => setShowCustomerModal(!customerModal)}
        >
          Visa mer
        </Button>
        <Link to={`/customer/${customer.id}`} className='router-link'>
          <Button variant='outline-primary' size='sm'>
            Gå till
          </Button>
        </Link>
      </td>
      <EditCustomerModal
        chores={chores}
        customer={customer}
        customerchores={customerchores}
        onHide={() => setShowCustomerModal(!customerModal)}
        periodics={periodics}
        show={customerModal}
        teams={teams}
        teammembers={teammembers}
      />
    </tr>
  );
};

export default CustomerRow;
