import { Card, Container } from "react-bootstrap";
import { BsChevronRight } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import { UserCustomerData } from "../api/client";

interface Props {
  customer: UserCustomerData;
}
const CustomerCard = ({ customer }: Props) => {
  // console.log(customer.customerChores);
  return (
    <Link to={`/customer/${customer.customerId}`} className='router-link'>
      <Card>
        <Card.Header className='d-flex align-items-center'>
          <Container>
            <Card.Title>{customer.customerName}</Card.Title>
            <Container className='d-flex align-items-center'>
              <MdLocationOn size={22} />
              <Card.Text className='ms-1'>{customer.customerAddress}</Card.Text>
            </Container>
          </Container>
          <BsChevronRight size={24} />
        </Card.Header>
        <Card.Body>
          <Container>
            {/* Temp */}
            <Card.Text>Uppgifter: {customer.customerChores!.length}st</Card.Text>
            {/* Temp */}
          </Container>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default CustomerCard;
