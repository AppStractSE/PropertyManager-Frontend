import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import { TeamResponseDto } from "../../../../api/client";
import DeleteTeamModal from "./DeleteTeamModal";

interface Props {
  team: TeamResponseDto;
}

const DeleteTeam = ({ team }: Props) => {
  const [deleteTeamModal, setDeleteTeamModal] = useState(false);
  return (
    <>
      <Button
        variant='danger'
        size='sm'
        className='d-flex align-items-center gap-2 ms-auto'
        onClick={() => setDeleteTeamModal(true)}
      >
        <BsFillTrashFill size={18} />
        <div>Radera team</div>
      </Button>
      <DeleteTeamModal
        show={deleteTeamModal}
        onHide={() => setDeleteTeamModal(false)}
        team={team}
      />
    </>
  );
};

export default DeleteTeam;
