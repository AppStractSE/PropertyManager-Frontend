import { useState } from "react";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import CustomerCard from "../components/CustomerCard";
import SearchAndFilter from "../components/SearchAndFilter";
import CustomerData from "../data/CustomerData";

const Home = () => {
  const data = CustomerData;
  const [searchValue, setSearchValue] = useState("");
  const filterSearch = data.filter((customer) =>
    customer.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

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
