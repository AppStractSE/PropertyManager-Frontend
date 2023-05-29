import { motion } from "framer-motion";
import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import dashboardData from "../../components/admindashboard/data/dashboardData";
import ProfileModal from "../../components/modals/ProfileModal";
import styles from "./style.module.scss";

const Navigation = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Nav variant='pills' className={`d-flex flex-column py-5 px-3 col-lg-2 col-sm-12 aside-nav`}>
      <div
        className={`d-flex justify-content-center flex-column align-items-center ${styles.logo}`}
      >
        <h3 className=''>PropertEase</h3>
        <div className='py-4'>
          <FaUserCircle size={32} onClick={() => setShowModal(true)} />
        </div>
      </div>
      <ProfileModal show={showModal} onHide={() => setShowModal(false)} />
      {dashboardData.map((item, i) => (
        <motion.div
          className=''
          key={i}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: i * 0.2 }}
        >
          <Nav.Item>
            <NavLink to={`${item.link}`} className='d-flex align-items-center gap-4 nav-link'>
              {<item.icon size={24} />}
              <div>{item.name}</div>
            </NavLink>
          </Nav.Item>
          {i === dashboardData.length - 2 ? (
            <hr className='navbar-divider px-4 my-4 opacity-70'></hr>
          ) : null}
        </motion.div>
      ))}
    </Nav>
  );
};

export default Navigation;
