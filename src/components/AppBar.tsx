import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { LinkContainer } from "react-router-bootstrap";
import { InitialUserState, useUser } from "../contexts/UserContext";
import ProfileModal from "./modals/ProfileModal";

const AppBar = () => {
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useUser();
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Container className='gap-4'>
        <Navbar.Toggle aria-controls='basic-navbar-nav'>
          <RxHamburgerMenu size={24} />
        </Navbar.Toggle>
        <LinkContainer to='/'>
          <Navbar.Brand>Property Manager</Navbar.Brand>
        </LinkContainer>
        <FaUserCircle size={24} onClick={() => setShowModal(true)} />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <LinkContainer to='/'>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            {currentUser === InitialUserState ? (
              <></>
            ) : (
              <>
                <LinkContainer to='/admin'>
                  <Nav.Link>Admin Dashboard</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/admin/overview'>
                  <Nav.Link>Admin Overview</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/admin/register'>
                  <Nav.Link>Register chore</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
        <ProfileModal show={showModal} onHide={() => setShowModal(false)} />
      </Container>
    </Navbar>
  );
};

export default AppBar;
