import { Modal } from "react-bootstrap";
import { AreaResponseDto } from "../../../../api/client";
import EditAreaTable from "../table/EditAreaTable";

interface Props {
  area: AreaResponseDto;
  show: boolean;
  onHide: () => void;
}

const EditAreaModal = ({ area, show, onHide }: Props) => {
  return (
    <Modal show={show} id='editArea' size='lg' onHide={() => onHide()}>
      <Modal.Header closeButton onHide={() => onHide()}>
        <Modal.Title>{area.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='m-3'>
        <EditAreaTable area={area} />
      </Modal.Body>
    </Modal>
  );
};

export default EditAreaModal;
