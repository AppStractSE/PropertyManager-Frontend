import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import {
  CustomerResponseDto,
  TeamMemberResponseDto,
  TeamResponseDto,
  UserInfoDto,
} from "../../../api/client";
import Search from "../../Search";
import AddTeamModal from "./add/AddTeamModal";
import TeamTable from "./table/TeamTable";

interface Props {
  users: UserInfoDto[];
  teams: TeamResponseDto[];
  teammembers: TeamMemberResponseDto[];
  customers: CustomerResponseDto[];
}

const TeamPane = ({ teams, teammembers, users, customers }: Props) => {
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  const [search, setSearch] = useState("");
  return (
    <Card className='default-cursor'>
      <Card.Header className='fs-4 mb-2'>Teamöversikt</Card.Header>
      <Card.Body>
        <div className='d-flex align-items-center gap-4 mb-3'>
          <Search value={search} onChange={(value) => setSearch(value)} placeholder='team' />
          <Button
            className='d-flex align-items-center gap-2 align-self-stretch'
            onClick={() => setShowAddTeamModal(!showAddTeamModal)}
          >
            <AiOutlinePlus size={18} />
            <div>Skapa nytt team</div>
          </Button>
        </div>
        <TeamTable
          search={search}
          teams={teams}
          teammembers={teammembers}
          users={users}
          customers={customers}
        />
        <AddTeamModal
          show={showAddTeamModal}
          onHide={() => setShowAddTeamModal(!showAddTeamModal)}
          teammembers={teammembers}
          users={users}
        />
      </Card.Body>
    </Card>
  );
};

export default TeamPane;
