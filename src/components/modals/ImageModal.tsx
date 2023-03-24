import { Modal } from "react-bootstrap";
import { HiDownload } from "react-icons/hi";

const ImageModal = (props: any) => {
  return (
    <Modal {...props} fullscreen id='image-modal'>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Uppladdad bild</Modal.Title>
        <HiDownload size={28} />
      </Modal.Header>
      <Modal.Body>
        <img className='uploaded-image' src={props.image} />
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
