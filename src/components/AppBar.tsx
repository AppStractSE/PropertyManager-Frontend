import { useState } from "react";
import { Col } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { FaUserCircle } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useUser } from "../contexts/UserContext";
import ProfileModal from "./modals/ProfileModal";

const AppBar = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Navbar bg='dark' variant='dark'>
      <Col className='d-flex align-items-center justify-content-between px-5'>
        <LinkContainer to='/'>
          <Navbar.Brand>Property Manager</Navbar.Brand>
        </LinkContainer>
        <FaUserCircle size={28} onClick={() => setShowModal(true)} />
        <ProfileModal show={showModal} onHide={() => setShowModal(false)} />
      </Col>
    </Navbar>
  );
};

export default AppBar;
