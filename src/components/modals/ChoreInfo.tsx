import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { BsCameraFill } from "react-icons/bs";
import ImageModal from "./ImageModal";

const ChoreInfo = (props: any) => {
  const [choreImage, setChoreImage] = useState("");
  const [imgModal, setImgModalShow] = useState(false);

  const handlePhotoCapture = (target: any) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setChoreImage(newUrl);
      }
    }
  };

  return (
    <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.chore.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='modal-body-section'>
          <Modal.Title className='p small'>Status</Modal.Title>
          <div className='p'>Ej påbörjad</div>
        </div>
        <div className='modal-body-section'>
          <Modal.Title className='p small'>Återkommer</Modal.Title>
          <div className='p'>4 gånger denna månad</div>
        </div>
        <div className='modal-body-section'>
          <Modal.Title className='p small'>Beskrivning</Modal.Title>
          <div className='p'>{props.chore.description}</div>
        </div>
        <div className='modal-body-section'>
          <div className='d-flex align-items-center camera-container'>
            <Button>
              <input
                className='d-none'
                accept='*/*'
                id='icon-button-file'
                type='file'
                onChange={(e) => handlePhotoCapture(e.target)}
              />
              <label htmlFor='icon-button-file'>
                <BsCameraFill size={24} />
              </label>
            </Button>
            <Form className='ms-1'>
              <Form.Group controlId='formComment'>
                <Form.Control type='text' placeholder='Lägg till en kommentar...' />
              </Form.Group>
            </Form>
          </div>
        </div>
        {choreImage && (
          <div className='modal-body-section'>
            <Modal.Title className='p small'>Bilagor</Modal.Title>
            <img width={100} src={choreImage} onClick={() => setImgModalShow(true)} />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Markera som klar</Button>
      </Modal.Footer>
      <ImageModal show={imgModal} onHide={() => setImgModalShow(false)} image={choreImage} />
    </Modal>
  );
};

export default ChoreInfo;
