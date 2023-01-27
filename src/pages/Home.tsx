import { motion } from "framer-motion";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import { useQuery } from "react-query";
import { container, item } from "../animation";
import { CustomerResponseDto } from "../api/client";
import CustomerCard from "../components/CustomerCard";
import SearchAndFilter from "../components/SearchAndFilter";
import HomePageSkeleton from "../components/skeletons/CustomerPageSkeleton";
import { useUser } from "../contexts/UserContext";
import useAxios from "../hooks/useAxios";

const Home = () => {
  const { currentUser } = useUser();
  const [searchValue, setSearchValue] = useState("");
  const fetchCustomers = useAxios({ url: "/Customer", method: "get" });
  const { data, error, isLoading } = useQuery<CustomerResponseDto[]>("customers", fetchCustomers);
  const filterSearch = data?.filter((customer) =>
    customer.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  if (isLoading || filterSearch === undefined || error) {
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
          <p>{currentUser.displayName}</p>
          <SearchAndFilter
            value={searchValue}
            onChange={setSearchValue}
            filterSearch={filterSearch.length}
          />
          {filterSearch.map((customer) => (
            <motion.div variants={item} key={customer.id}>
              <CustomerCard customer={customer} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default Home;
