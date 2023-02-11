import { Table } from "react-bootstrap";
import { CustomerResponseDto, TeamMemberResponseDto, TeamResponseDto } from "../../api/client";
import CustomerRow from "./CustomerRow";

interface Props {
  customers: CustomerResponseDto[];
  teams: TeamResponseDto[];
  teammembers: TeamMemberResponseDto[];
}

const CustomerTable = ({ customers, teams, teammembers }: Props) => {
  return (
      <Table hover>
        <thead>
          <tr>
            <th style={{ textTransform: "uppercase", fontSize: 12 }}>Kundnamn</th>
            <th style={{ textTransform: "uppercase", fontSize: 12 }}>Adress</th>
            <th style={{ textTransform: "uppercase", fontSize: 12 }}>Team</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {customers?.map((customer, i) => (
            <tr>
              <CustomerRow customer={customer} teams={teams} teammembers={teammembers} />
            </tr>
          ))}
        </tbody>
      </Table>
  );
};

export default CustomerTable;
