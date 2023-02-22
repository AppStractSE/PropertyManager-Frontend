import { Modal, Nav, Tab } from "react-bootstrap";
import { TeamMemberResponseDto, TeamResponseDto, UserInfoDto } from "../../../api/client";
import EditTeam from "../team/EditTeam";

interface Props {
  show: boolean;
  onHide: () => void;
  team: TeamResponseDto;
  teammembers: TeamMemberResponseDto[];
  users: UserInfoDto[];
}

const EditCustomerModal = ({ team, teammembers, users, show, onHide }: Props) => {
  return (
    <Modal show={show} id='editCustomer' size='lg' onEscapeKeyDown={() => onHide()}>
      <Modal.Header closeButton onHide={() => onHide()}>
        <Modal.Title id='contained-modal-title-vcenter'>{team.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='px-3 py-2 mb-2'>
        <Tab.Container defaultActiveKey='first'>
          <Nav variant='pills' className='flex-row mb-4'>
            <Nav.Item>
              <Nav.Link eventKey='first'>Kunduppgifter</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey='first'>
              <EditTeam users={users} team={team} teammembers={teammembers} onHide={onHide} />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
    </Modal>
  );
};

export default EditCustomerModal;
