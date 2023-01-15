import { motion } from "framer-motion";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import { useQuery } from "react-query";
import { container, item } from "../animation";
import CustomerCard from "../components/CustomerCard";
import SearchAndFilter from "../components/SearchAndFilter";
import HomePageSkeleton from "../components/skeletons/CustomerPageSkeleton";
import useAxios from "../hooks/useAxios";
import { Customer } from "../models/Customer";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const fetchCustomers = useAxios({ url: "/Customer", method: "get" });
  const { data, error, isLoading } = useQuery<Customer[]>("customers", fetchCustomers);
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

  // if (error || data == undefined) {
  //   return <div>Error!</div>;
  // }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Container className='mt-3 mb-3'>
        <div className='h3'>Dina kunder</div>
        <Stack direction='vertical' gap={3}>
          <SearchAndFilter
            value={searchValue}
            onChange={setSearchValue}
            filterSearch={filterSearch.length}
          />
          <motion.div
            variants={container}
            initial='hidden'
            animate='show'
            className='vstack gap-3 minBreakpoint-xs'
          >
            {filterSearch.map((customer) => (
              <div key={customer.id}>
                <motion.div variants={item}>
                  <CustomerCard customer={customer} />
                </motion.div>
              </div>
            ))}
          </motion.div>
        </Stack>
      </Container>
    </motion.div>
  );
};

export default Home;
