import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import dashboardData from "../../components/admindashboard/data/dashboardData";
import MenuModal from "../../components/modals/MenuModal";
import ProfileModal from "../../components/modals/ProfileModal";
import React from "react";

const Navigation = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [smScreen, setSmScreen] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 992) {
      setSmScreen(true);
    } else {
      setSmScreen(false);
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth < 992) {
        setSmScreen(true);
      } else {
        setSmScreen(false);
      }
    }
    );
  }, []);


  return (
    <Nav variant='pills' className='d-flex flex-column px-3 pt-4 col-12 col-lg-2 aside-nav'>
      {smScreen ? (
        <div className='d-flex justify-content-between align-items-center mb-4'>
          <HiOutlineMenuAlt2 size={32} onClick={() => setShowMenu(true)} />
          <h3>PropertEase</h3>
          <FaUserCircle size={32} onClick={() => setShowProfile(true)} />
        </div>
      ) : (
        <div className='d-flex justify-content-center flex-column align-items-center'>
          <h3>PropertEase</h3>
          <FaUserCircle size={40} onClick={() => setShowProfile(true)} className='my-4' />
        </div>
      )}
      <MenuModal show={showMenu} onHide={() => setShowMenu(false)} />
      <ProfileModal show={showProfile} onHide={() => setShowProfile(false)} />
      {smScreen ? null : (
        <>
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
        </>
      )}
    </Nav>
  );
};

export default Navigation;
