import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { useUser } from "../../contexts/UserContext";

const ProfileModal = (props: any) => {
  const { logout } = useUser();
  const { isDarkTheme, toggleDarkTheme } = useTheme();
  const navigate = useNavigate();
  return (
    <Modal
      {...props}
      fullscreen
      aria-labelledby='contained-modal-title-vcenter'
      centered
      className='filter'
    >
      <Modal.Header closeButton className='d-flex flex-row-reverse'>
        <Modal.Title>Profil</Modal.Title>
      </Modal.Header>
      <Modal.Body className='p-2'>
        <div className='modal-body-section'>
          <Form>
            <Form.Text>Temainställningar</Form.Text>
            <Form.Group className='d-flex align-center-items filter-group'>
              <Form.Label>Mörkt läge</Form.Label>
              <Form.Check
                name='group1'
                type='switch'
                checked={isDarkTheme}
                onChange={toggleDarkTheme}
              />
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.onHide();
            logout();
            navigate("/");
          }}
        >
          Logga ut
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileModal;
