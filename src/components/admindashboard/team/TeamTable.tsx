import { Table } from "react-bootstrap";
import {
  CustomerResponseDto,
  TeamMemberResponseDto,
  TeamResponseDto,
  UserInfoDto,
} from "../../../api/client";
import TeamRow from "./TeamRow";

interface Props {
  teams: TeamResponseDto[];
  teammembers: TeamMemberResponseDto[];
  users: UserInfoDto[];
  customers: CustomerResponseDto[];
}

const TeamTable = ({ teams, teammembers, users, customers }: Props) => {
  return (
    <Table hover>
      <thead>
        <tr>
          <th style={{ textTransform: "uppercase", fontSize: 12 }}>Teamnamn</th>
          <th style={{ textTransform: "uppercase", fontSize: 12 }}>Medlemmar</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {teams?.map((team) => (
          <TeamRow
            key={team.id}
            team={team}
            teammembers={teammembers}
            users={users}
            customers={customers}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default TeamTable;
