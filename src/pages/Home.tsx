import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import CustomerCard from "../components/CustomerCard";
import SearchAndFilter from "../components/SearchAndFilter";
import CustomerData from "../data/CustomerData";

const Home = () => {
  const data = CustomerData;
  return (
    <Container className='mt-3'>
      <div className='h3'>Dina kunder</div>
      <Stack direction='vertical' gap={3}>
        <SearchAndFilter />
        {data.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </Stack>
    </Container>
  );
};

export default Home;
