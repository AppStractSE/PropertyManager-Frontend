import { Card, Container, ProgressBar } from "react-bootstrap";
import { BsChevronRight } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import { CustomerResponseDto } from "../api/client";

interface Props {
  customer: CustomerResponseDto;
}
const CustomerCard = ({ customer }: Props) => {
  return (
    <Link to={`/customer/${customer.id}`} className='router-link'>
      <Card>
        <Card.Header className='d-flex align-items-center'>
          <Container>
            <Card.Title>{customer.name}</Card.Title>
            <Container className='d-flex align-items-center'>
              <MdLocationOn size={22} />
              <Card.Text className='ms-1'>{customer.address}</Card.Text>
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
    </Link>
  );
};

export default CustomerCard;
