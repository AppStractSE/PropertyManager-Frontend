import { useState } from "react";
import { Button } from "react-bootstrap";
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
      <td>
        {customerchores.filter((x) => x.status === "Klar" && x.customerId === customer.id).length}
      </td>
      <td>
        {
          customerchores.filter((x) => x.status === "Påbörjad" && x.customerId === customer.id)
            .length
        }
      </td>
      <td>
        {
          customerchores.filter((x) => x.status === "Ej påbörjad" && x.customerId === customer.id)
            .length
        }
      </td>
      <td>{teams.filter((team) => team.id === customer.teamId).map((team) => team.name)}</td>

      <td>
        <Button
          className='me-2'
          variant='outline-primary'
          size='sm'
          onClick={() => setShowCustomerModal(!customerModal)}
        >
          Visa mer
        </Button>
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
