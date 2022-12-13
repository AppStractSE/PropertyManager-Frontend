import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import ProgressBar from "react-bootstrap/ProgressBar";
import Stack from "react-bootstrap/Stack";
import { BsChevronRight } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import CustomerData from "../data/CustomerData";
import "../styling/overrides.scss";

const Home = () => {
  const data = CustomerData;
  return (
    <Container className='mt-5'>
      <div className='h3'>Dina kunder</div>
      <Stack direction='vertical' gap={3}>
        {data.map((x) => (
          <Card key={x.id}>
            <Card.Header className='d-flex align-items-center'>
              <Container>
                <Card.Title>{x.name}</Card.Title>
                <Container className='d-flex align-items-center'>
                  <MdLocationOn size={22} />
                  <Card.Text className='ms-1'>{x.address}</Card.Text>
                </Container>
              </Container>
              <BsChevronRight size={24} />
            </Card.Header>
            <Card.Body>
              <Container>
                <Card.Text>Antalet uppgifter denna vecka</Card.Text>
                <ProgressBar>
                  <ProgressBar variant='success' now={25} key={1} label='1' />
                  <ProgressBar variant='warning' now={25} key={2} label='1' />
                  <ProgressBar variant='danger' now={50} key={3} label='4' />
                </ProgressBar>
              </Container>
            </Card.Body>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default Home;
