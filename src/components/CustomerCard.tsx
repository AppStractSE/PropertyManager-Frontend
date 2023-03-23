import { Badge, Card, Container } from "react-bootstrap";
import { BsChevronRight } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import { UserCustomerData, UserTeamData } from "../api/client";

interface Props {
  customer: UserCustomerData;
  team: UserTeamData;
}
const CustomerCard = ({ customer, team }: Props) => {
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
          <div className='d-flex align-items-center justify-content-between'>
            {team.isTemporary === true && (
              <Badge className="me-2" text='dark' pill bg='warning'>
                TEMP
              </Badge>
            )}
            <BsChevronRight size={24} />
          </div>
        </Card.Header>
        <Card.Body>
          <Container>
            {/* Temp */}
            <Card.Text>Uppgifter: {customer.customerChores?.length}st</Card.Text>
            {/* Temp */}
          </Container>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default CustomerCard;
