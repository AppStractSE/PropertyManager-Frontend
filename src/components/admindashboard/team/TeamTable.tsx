import { Table } from "react-bootstrap";
import { TeamMemberResponseDto, TeamResponseDto, UserInfoDto } from "../../../api/client";
import TeamRow from "./TeamRow";

interface Props {
  teams: TeamResponseDto[];
  teammembers: TeamMemberResponseDto[];
  users: UserInfoDto[];
}

const TeamTable = ({ teams, teammembers, users }: Props) => {
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
          <tr key={team.id}>
            <TeamRow team={team} teammembers={teammembers} users={users} />
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TeamTable;
