import { motion } from "framer-motion";
import { lazy, useState } from "react";
import { Container } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { container, item } from "../animation";
import { UserCustomerData, UserTeamData } from "../api/client";
import CustomerCard from "../components/CustomerCard";
import Search from "../components/Search";
import HomePageSkeleton from "../components/skeletons/HomePageSkeleton";
import { useUser } from "../contexts/UserContext";
import { useQueries } from "../hooks/useQueries";
import React from "react";

const ProfileModal = lazy(() => import("../components/modals/ProfileModal"));

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useUser();
  const { userData } = useQueries();

  const filterSearch = userData?.userTeamsData?.filter((team) => {
    return team.userCustomersData?.every((customer) => customer.customerName?.toLowerCase());
  });

  const filteredCustomers = filterSearch
    ?.flatMap((team) => team?.userCustomersData)
    .filter((customer) =>
      customer?.customerName?.toLowerCase().includes(searchValue?.toLowerCase()),
    );

  if (!userData || !filteredCustomers) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <HomePageSkeleton />
      </motion.div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className='d-flex flex-column h-100 overflow-hidden'
    >
      <Container className='d-flex align-items-center border-bottom py-3'>
        <div className='h3 mb-0 me-auto usel-none'>PropertEase</div>
        <FaUserCircle size={28} onClick={() => setShowModal(true)} />
        <ProfileModal show={showModal} onHide={() => setShowModal(false)} />
      </Container>
      <Container className='h-100 py-3 scrollable'>
        <motion.div variants={container} initial='hidden' animate='show'>
          <Search
            value={searchValue}
            onChange={(value) => setSearchValue(value)}
            placeholder='kund'
          />
          <div className='d-flex flex-column gap-3'>
          {filteredCustomers?.length < 1 ? (
              <div className='text-break'>Inga resultat hittades {searchValue ? `för "${searchValue}"` : undefined}</div>
              ) : undefined}
            {(filteredCustomers?.length || 0 > 0) &&
              filterSearch?.map((team: UserTeamData, idx) => (
                <React.Fragment key={idx}>
                  {team?.userCustomersData
                    ?.filter((x) =>
                      x.customerName?.toLowerCase().includes(searchValue.toLowerCase()),
                    )
                    .map((customer: UserCustomerData) => (
                      <motion.div key={customer.customerId} variants={item}>
                        <CustomerCard team={team} customer={customer} />
                      </motion.div>
                    ))}
                </React.Fragment>
              ))}
          </div>
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default Home;
