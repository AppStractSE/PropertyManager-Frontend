import { Button, Table } from "react-bootstrap";
import { useQueryClient } from "react-query";
import {
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
}

const CustomerTable = ({ customers, teams, teammembers, customerchores, periodics }: Props) => {
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
          <tr>
            <CustomerRow
              customer={customer}
              teams={teams}
              teammembers={teammembers}
              customerchores={customerchores}
              periodics={periodics}
            />
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CustomerTable;
