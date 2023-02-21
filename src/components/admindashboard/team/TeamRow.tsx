import { useState } from "react";
import { Button } from "react-bootstrap";
import { TeamMemberResponseDto, TeamResponseDto, UserInfoDto } from "../../../api/client";
import EditTeamModal from "../modals/EditTeamModal";

interface Props {
  team: TeamResponseDto;
  teammembers: TeamMemberResponseDto[];
  users: UserInfoDto[];
}

const TeamRow = ({ team, teammembers, users }: Props) => {
  const [rowIsDisabled, setRowIsDisabled] = useState(true);
  const [teamName, setTeamName] = useState();
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <td>{team.name}</td>
      <td>
        {teammembers
          ?.filter((x) => x.teamId === team.id)
          .map((teammember) => (
            <div>{users?.find((user) => teammember.userId === user.userId)?.displayName}</div>
          ))}
      </td>
      <td>
        <Button variant='outline-primary' size='sm' onClick={() => setShowModal(!showModal)}>
          Visa mer
        </Button>
        {teammembers && team && (
          <EditTeamModal
            show={showModal}
            onHide={() => setShowModal(false)}
            team={team}
            teammembers={teammembers}
          ></EditTeamModal>
        )}
      </td>
    </>
  );
};

export default TeamRow;
