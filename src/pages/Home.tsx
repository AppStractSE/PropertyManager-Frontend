import { motion } from "framer-motion";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { container, item } from "../animation";
import { UserCustomerData, UserTeamData } from "../api/client";
import AppBar from "../components/AppBar";
import CustomerCard from "../components/CustomerCard";
import Search from "../components/Search";
import HomePageSkeleton from "../components/skeletons/HomePageSkeleton";
import { useUser } from "../contexts/UserContext";
import { useQueries } from "../hooks/useQueries";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
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

  if (!userData) {
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
    >
      <AppBar />
      <Container className='mt-3 mb-3 safe-area'>
        <motion.div
          variants={container}
          initial='hidden'
          animate='show'
          className='d-flex flex-column gap-2'
        >
          <div className='h3 mb-0'>Mina kunder</div>
          <div className='h5'>{currentUser.user?.displayName}</div>
          <div className='d-flex align-items-center'>
            <Search
              value={searchValue}
              onChange={(value) => setSearchValue(value)}
              placeholder='kund'
            />
          </div>
          <div className='fs-7 mb-2'>
            {(filteredCustomers?.length || 0) > 0
              ? `Visar ${filteredCustomers?.length}st kunder`
              : "Inga kunder hittades"}
          </div>
          {(filteredCustomers?.length || 0 > 0) &&
            filterSearch?.map((team: UserTeamData) => (
              <motion.div
                variants={item}
                key={team.teamId}
                className='d-flex flex-column gap-3 mt-2'
              >
                {team?.userCustomersData
                  ?.filter((x) => x.customerName?.toLowerCase().includes(searchValue.toLowerCase()))
                  .map((customer: UserCustomerData) => (
                    <div key={customer.customerId}>
                      <CustomerCard team={team} customer={customer} />
                    </div>
                  ))}
              </motion.div>
            ))}
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default Home;
