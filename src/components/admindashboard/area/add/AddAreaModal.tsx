import { Modal } from "react-bootstrap";
import AddArea from "./AddArea";

interface Props {
  show: boolean;
  onHide: () => void;
}

const AddAreaModal = ({ show, onHide }: Props) => {
  return (
    <Modal show={show} onHide={() => onHide()}>
      <Modal.Header closeButton>
        <Modal.Title>Skapa nytt område</Modal.Title>
      </Modal.Header>
      <Modal.Body className='m-3'>
        <AddArea close={() => onHide()} />
      </Modal.Body>
    </Modal>
  );
};

export default AddAreaModal;
