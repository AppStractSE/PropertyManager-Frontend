import { Form, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { BsCameraFill } from "react-icons/bs";

const ChoreInfo = (props: any) => {
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
              <BsCameraFill size={24} />
            </Button>
            <Form className='ms-1'>
              <Form.Group controlId='formComment'>
                <Form.Control type='text' placeholder='Lägg till en kommentar...' />
              </Form.Group>
            </Form>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Markera som klar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChoreInfo;
