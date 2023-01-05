import { useState } from "react";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import { useQuery } from "react-query";
import CustomerCard from "../components/CustomerCard";
import SearchAndFilter from "../components/SearchAndFilter";
import HomePageSkeleton from "../components/skeletons/HomePageSkeleton";
import useAxios from "../hooks/useAxios";
import { Customer } from "../models/Customer";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const fetchCustomers = useAxios({ url: "/Customer", method: "get" });
  const { data, error, isLoading } = useQuery<Customer[]>("customers", fetchCustomers);
  const filterSearch = data?.filter((customer) =>
    customer.name.toLowerCase().includes(searchValue.toLowerCase()),
  );
  if (isLoading || filterSearch === undefined) {
    return <HomePageSkeleton />;
  }

  if (error || data == undefined) {
    return <div>Error!</div>;
  }

  return (
    <Container className='mt-3'>
      <div className='h3'>Dina kunder</div>
      <Stack direction='vertical' gap={3}>
        <SearchAndFilter
          value={searchValue}
          onChange={setSearchValue}
          filterSearch={filterSearch.length}
        />
        {filterSearch.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </Stack>
    </Container>
  );
};

export default Home;
