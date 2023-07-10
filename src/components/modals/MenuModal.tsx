import React from "react";
import { Nav, Offcanvas } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import dashboardData from "../admindashboard/data/dashboardData";

interface Props {
  show: boolean;
  onHide: () => void;
}

const MenuModal = ({ show, onHide }: Props) => {
  return (
    <Offcanvas show={show} onHide={() => onHide()}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>PropertEase</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav variant='pills' className="d-flex flex-column">
          {dashboardData.map((item, i) => (
            <React.Fragment key={i}>
              <Nav.Item onClick={() => onHide()}>
                <NavLink to={`${item.link}`} className='d-flex align-items-center gap-4 nav-link border-0'>
                  {<item.icon size={24} />}
                  <div>{item.name}</div>
                </NavLink>
              </Nav.Item>
              {i === dashboardData.length - 2 ? (
                <hr className='navbar-divider px-4 my-4 opacity-70'></hr>
              ) : null}
            </React.Fragment>
          ))}
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default MenuModal;
