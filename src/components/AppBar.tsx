import { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { FaUserCircle } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useUser } from "../contexts/UserContext";
import ProfileModal from "./modals/ProfileModal";

const AppBar = () => {
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useUser();
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Container className='gap-4'>
        <LinkContainer to='/'>
          <Navbar.Brand>Property Manager</Navbar.Brand>
        </LinkContainer>
        <FaUserCircle size={24} onClick={() => setShowModal(true)} />
        <ProfileModal show={showModal} onHide={() => setShowModal(false)} />
      </Container>
    </Navbar>
  );
};

export default AppBar;
