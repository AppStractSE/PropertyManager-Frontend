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
  const amountDone = customerchores.filter(
    (x) => x.status === "Klar" && x.customerId === customer.id,
  ).length;
  const amountStarted = customerchores.filter(
    (x) => x.status === "Påbörjad" && x.customerId === customer.id,
  ).length;
  const amountNotStarted = customerchores.filter(
    (x) => x.status === "Ej påbörjad" && x.customerId === customer.id,
  ).length;
  const teamAssigned = teams.filter((team) => team.id === customer.teamId).map((team) => team.name);
  return (
    <tr>
      <td>{customer.name}</td>
      <td>{amountDone}</td>
      <td>{amountStarted}</td>
      <td>{amountNotStarted}</td>
      <td>
        {teamAssigned === undefined || teamAssigned.length === 0 ? (
          <div className='fst-italic text-secondary'>Inget team tilldelat</div>
        ) : (
          teamAssigned
        )}
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
        <Link to={`/customer/${customer.slug}`}>
          <Button className='me-2' variant='outline-primary' size='sm'>
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
