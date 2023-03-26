import { useState } from "react";
import { Button } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import {
  CustomerResponseDto,
  TeamMemberResponseDto,
  TeamResponseDto,
  UserInfoDto,
} from "../../../api/client";
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
  return (
    <>
      <div className='d-flex'>
        <div className='fs-4 mb-2 me-auto'>Teamöversikt</div>
        <Button
          size='sm'
          className='d-flex align-items-center gap-2'
          onClick={() => setShowAddTeamModal(true)}
        >
          <AiOutlinePlus size={18} />
          <div>Skapa nytt team</div>
        </Button>
      </div>
      <TeamTable teams={teams} teammembers={teammembers} users={users} customers={customers} />
      <AddTeamModal
        show={showAddTeamModal}
        onHide={() => setShowAddTeamModal(false)}
        teammembers={teammembers}
        users={users}
      />
    </>
  );
};

export default TeamPane;
