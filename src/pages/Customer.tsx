import { Container, Spinner, Stack } from "react-bootstrap";
import { BsChevronLeft } from "react-icons/bs";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import ChoreCard from "../components/ChoreCard";
import useAxios from "../hooks/useAxios";
import { CustomerChore } from "../models/CustomerChore";
const Customer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fetchCustomerChores = useAxios({
    url: `/CustomerChore/GetCustomerChoresByCustomerId?Id=${id}`,
    method: "get",
  });
  const { data, error, isLoading } = useQuery<CustomerChore[]>(
    "customerChores",
    fetchCustomerChores,
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (error || data == undefined) {
    return <div>Error!</div>;
  }

  return (
    <Container className='mt-3'>
      <div className='d-flex align-items-center'>
        <div onClick={() => navigate("/")}>
          <BsChevronLeft size={28} />
        </div>
        <Container>
          <div className='h3 mb-0'>{data[0].customer.name}</div>
          <div className='p'>{data[0].customer.address}</div>
        </Container>
      </div>
      <Stack direction='vertical' gap={2}>
        {data.map((data) => (
          <ChoreCard key={data.id} customerchore={data} />
        ))}
      </Stack>
    </Container>
  );
};

export default Customer;
