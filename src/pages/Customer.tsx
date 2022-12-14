import { Container, Stack } from "react-bootstrap";
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import ChoreCard from "../components/ChoreCard";
import CustomerData from "../data/CustomerData";
const Customer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const customer = CustomerData.find((p) => p.id === id) ?? CustomerData[0];

  return (
    <Container className='mt-3'>
      <div className='d-flex align-items-center'>
        <div onClick={() => navigate(-1)}>
          <BsChevronLeft size={28} />
        </div>
        <Container>
          <div className='h3 mb-0'>{customer.name}</div>
          <div className='p'>{customer.address}</div>
        </Container>
      </div>
      <Stack direction='vertical' gap={2}>
        {customer.chores.map((chore) => (
          <ChoreCard key={chore.id} chore={chore} />
        ))}
      </Stack>
    </Container>
  );
};

export default Customer;
