import { Modal } from "react-bootstrap";
import { TeamMemberResponseDto, UserInfoDto } from "../../../../api/client";
import AddTeam from "./AddTeam";

interface Props {
  users: UserInfoDto[];
  teammembers: TeamMemberResponseDto[];
  show: boolean;
  onHide: () => void;
}

const AddTeamModal = ({ teammembers, users, show, onHide }: Props) => {
  return (
    <Modal show={show} onHide={() => onHide()}>
      <Modal.Header closeButton>
        <Modal.Title>Skapa nytt team</Modal.Title>
      </Modal.Header>
      <Modal.Body className='m-3'>
        <AddTeam users={users} teammembers={teammembers} close={() => onHide()} />
      </Modal.Body>
    </Modal>
  );
};

export default AddTeamModal;
