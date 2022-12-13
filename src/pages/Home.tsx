import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import CustomerCard from "../components/CustomerCard";
import CustomerData from "../data/CustomerData";
import "../styling/overrides.scss";

const Home = () => {
  const data = CustomerData;
  return (
    <Container className='mt-5'>
      <div className='h3'>Dina kunder</div>
      <Stack direction='vertical' gap={3}>
        {data.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </Stack>
    </Container>
  );
};

export default Home;
