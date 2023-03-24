import { Table } from "react-bootstrap";
import {
  ChoreResponseDto,
  CustomerChoreResponseDto,
  CustomerResponseDto,
  Periodic,
  TeamMemberResponseDto,
  TeamResponseDto,
} from "../../../api/client";
import CustomerRow from "./CustomerRow";

interface Props {
  customers: CustomerResponseDto[];
  teams: TeamResponseDto[];
  teammembers: TeamMemberResponseDto[];
  customerchores: CustomerChoreResponseDto[];
  periodics: Periodic[];
  chores: ChoreResponseDto[];
}

const CustomerTable = ({
  customers,
  teams,
  teammembers,
  customerchores,
  periodics,
  chores,
}: Props) => {
  return (
    <Table hover>
      <thead>
        <tr>
          <th style={{ textTransform: "uppercase", fontSize: 12 }}>Kundnamn</th>
          <th style={{ textTransform: "uppercase", fontSize: 12 }}>Adress</th>
          <th style={{ textTransform: "uppercase", fontSize: 12 }}>Team</th>
          <th style={{ textTransform: "uppercase", fontSize: 12 }}>Antal sysslor</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {customers?.map((customer, i) => (
          <CustomerRow
            key={customer.id}
            customer={customer}
            teams={teams}
            teammembers={teammembers}
            customerchores={customerchores}
            periodics={periodics}
            chores={chores}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default CustomerTable;
