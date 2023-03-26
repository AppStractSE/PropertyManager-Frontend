import { Modal } from "react-bootstrap";
import { AreaResponseDto, TeamResponseDto } from "../../../../api/client";
import AddCustomer from "./AddCustomer";

interface Props {
  teams: TeamResponseDto[];
  areas: AreaResponseDto[];
  show: boolean;
  onHide: () => void;
}

const AddCustomerModal = ({ teams, areas, show, onHide }: Props) => {
  return (
    <Modal show={show} onHide={() => onHide()}>
      <Modal.Header closeButton>
        <Modal.Title>Skapa ny kund</Modal.Title>
      </Modal.Header>
      <Modal.Body className='m-3'>
        <AddCustomer teams={teams} areas={areas} close={() => onHide()} />
      </Modal.Body>
    </Modal>
  );
};

export default AddCustomerModal;
