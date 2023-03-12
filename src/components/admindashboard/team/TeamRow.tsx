import { useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { CustomerResponseDto, TeamMemberResponseDto, TeamResponseDto, UserInfoDto } from "../../../api/client";
import EditTeamModal from "../modals/EditTeamModal";

interface Props {
  team: TeamResponseDto;
  teammembers: TeamMemberResponseDto[];
  users: UserInfoDto[];
  customers: CustomerResponseDto[];
}

const TeamRow = ({ team, teammembers, users, customers }: Props) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <tr>
      <td>{team.name}</td>
      <td>
        {teammembers
          ?.filter((x) => x.teamId === team.id)
          .map((teammember) => (
            <div className='d-flex gap-2 mb-1 align-items-center' key={teammember.userId}>
              <div className='me-2'>
                {users?.find((user) => teammember.userId === user.userId)?.displayName}
              </div>
              <Badge
                className='text-uppercase'
                style={{ fontSize: "0.6rem" }}
                text={teammember.isTemporary ? "dark" : undefined}
                bg={teammember.isTemporary ? "warning" : "primary"}
              >
                {teammember.isTemporary ? "Tillfällig" : "Ordinarie"}
              </Badge>
            </div>
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
            customers={customers.filter((x) => x.teamId === team.id)}
            teammembers={teammembers.filter((x) => x.teamId === team.id)}
            users={users}
          />
        )}
      </td>
    </tr>
  );
};

export default TeamRow;
