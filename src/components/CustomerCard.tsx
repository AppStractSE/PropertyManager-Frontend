import { Badge, Card, Container } from "react-bootstrap";
import { BiCheck } from "react-icons/bi";
import { GoX } from "react-icons/go";
import { VscPieChart } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { UserCustomerData, UserTeamData } from "../api/client";

interface Props {
  customer: UserCustomerData;
  team: UserTeamData;
}
const CustomerCard = ({ customer, team }: Props) => {
  return (
    <Link to={`/customer/${customer.customerSlug}`}>
      <Card>
        <Card.Body>
          <Container className='d-flex align-items-center'>
            <Card.Title className='me-auto'>{customer.customerName}</Card.Title>
            {team.isTemporary === true && (
              <Badge text='dark' pill bg='warning'>
                TEMP
              </Badge>
            )}
          </Container>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default CustomerCard;
