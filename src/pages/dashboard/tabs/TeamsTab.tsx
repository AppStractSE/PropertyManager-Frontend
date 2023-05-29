/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { Card } from "react-bootstrap";
import {
  CustomerResponseDto,
  TeamMemberResponseDto,
  TeamResponseDto,
  UserInfoDto,
} from "../../../api/client";
import Search from "../../../components/Search";
import TeamTable from "../../../components/admindashboard/team/table/TeamTable";

interface Props {
  teams: TeamResponseDto[];
  customers: CustomerResponseDto[];
  users: UserInfoDto[];
  teammembers: TeamMemberResponseDto[];
}

const TeamsTab = ({ teams, customers, users, teammembers }: Props) => {
  const [search, setSearch] = useState("");
  return (
    <>
      <Card className='default-cursor'>
        <Card.Header className='fs-4 mb-2'>Teams</Card.Header>
        <Card.Body>
          <Search value={search} onChange={(value) => setSearch(value)} placeholder={"teams"} />
          <TeamTable
            search={search}
            teams={teams}
            teammembers={teammembers}
            users={users}
            customers={customers}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default TeamsTab;
