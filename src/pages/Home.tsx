import { motion } from "framer-motion";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useQuery } from "react-query";
import { container, item } from "../animation";
import { Client, UserCustomerData, UserDataResponseDto, UserTeamData } from "../api/client";
import CustomerCard from "../components/CustomerCard";
import SearchAndFilter from "../components/SearchAndFilter";
import HomePageSkeleton from "../components/skeletons/CustomerPageSkeleton";
import { useUser } from "../contexts/UserContext";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const { currentUser } = useUser();
  const client = new Client();

  const { data: userData, isLoading: userDataIsLoading } = useQuery<UserDataResponseDto>(
    ["userData", currentUser.userId],
    async () => client.userData_GetUserDataById(currentUser.userId!),
  );

  const filterSearch = userData?.userTeamsData?.filter((team) => {
    return team.userCustomersData?.every((customer) =>
      customer.customerName?.toLowerCase().includes(searchValue.toLowerCase()),
    );
  });

  if (userDataIsLoading) {
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
      <Container className='mt-3 mb-3'>
        <motion.div
          variants={container}
          initial='hidden'
          animate='show'
          className='vstack gap-2 minBreakpoint-xs'
        >
          <div className='h3 mb-0'>Mina kunder</div>
          <SearchAndFilter value={searchValue} onChange={setSearchValue} filtersearch={0} />

          {filterSearch?.map((team: UserTeamData) => (
            <div key={team.teamId} className='vstack gap-2 minBreakpoint-xs'>
              <div className='d-flex justify-content-between'>
                <div>{team.teamName}</div>
              </div>
              {team?.userCustomersData?.map((customer: UserCustomerData) => (
                <motion.div variants={item} key={customer.customerId}>
                  <CustomerCard customer={customer} />
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default Home;
