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
    <Navbar className="border-bottom">
      <Col className='d-flex align-items-center px-3 justify-content-between'>
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
