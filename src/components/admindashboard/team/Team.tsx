import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { TeamMemberResponseDto, TeamResponseDto, UserInfoDto } from "../../../api/client";
import AddTeam from "./AddTeam";
import TeamTable from "./TeamTable";

interface Props {
  users: UserInfoDto[];
  teams: TeamResponseDto[];
  teammembers: TeamMemberResponseDto[];
}

const Team = ({ teams, teammembers, users }: Props) => {
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  return (
    <>
      <div className='d-flex'>
        <div className='fs-4 mb-2 me-auto'>Team</div>
        <Button
          size='sm'
          className='d-flex align-items-center gap-2'
          onClick={() => setShowAddTeamModal(true)}
        >
          <AiOutlinePlus size={20} />
          <div>Skapa nytt team</div>
        </Button>
      </div>
      {teams && teammembers && users && (
        <TeamTable teams={teams} teammembers={teammembers} users={users} />
      )}
      <Modal show={showAddTeamModal} onHide={() => setShowAddTeamModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Skapa nytt team</Modal.Title>
        </Modal.Header>
        <Modal.Body className='m-3'>
          <AddTeam users={users} teammembers={teammembers} close={() => setShowAddTeamModal(false)} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Team;
