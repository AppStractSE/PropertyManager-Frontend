import { Table } from "react-bootstrap";
import {
  CustomerResponseDto,
  TeamMemberResponseDto,
  TeamResponseDto,
  UserInfoDto,
} from "../../../../api/client";
import TeamRow from "./TeamRow";

interface Props {
  customers: CustomerResponseDto[];
  search: string;
  teams: TeamResponseDto[];
  teammembers: TeamMemberResponseDto[];
  users: UserInfoDto[];
}

const TeamTable = ({ teams, teammembers, users, customers, search }: Props) => {
  return (
    <Table hover>
      <thead>
        <tr>
          <th className='text-uppercase fs-7'>Teamnamn</th>
          <th className='text-uppercase fs-7'>Medlemmar</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {teams
          ?.filter((x) => x.name?.toLowerCase().includes(search.toLowerCase()))
          .map((team) => (
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
