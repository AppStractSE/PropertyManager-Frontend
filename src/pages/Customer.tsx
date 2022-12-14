import { Card, Container, Stack } from "react-bootstrap";
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
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
          <div className='p pointer'>{customer.address}</div>
        </Container>
      </div>
      <Stack direction='vertical' gap={2}>
        {customer.chores.map((x) => (
          <Card>
            <Card.Body>
              <Container className='d-flex align-items-center'>
                <Container>
                  <Card.Text>{x.name}</Card.Text>
                </Container>
                <div
                  style={{ height: 12, width: 12, background: "red", borderRadius: "50%" }}
                ></div>
              </Container>
            </Card.Body>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default Customer;
