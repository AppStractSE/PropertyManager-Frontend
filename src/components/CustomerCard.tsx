import React from "react";
import { Badge, Card, Container } from "react-bootstrap";
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
          <div className='fs-7 opacity-50 mb-1'>{customer.customerAddress}</div>
          <Container className='d-flex align-items-center'>
            <Card.Title className='me-auto mb-0'>{customer.customerName}</Card.Title>
            {team.isTemporary ? (
              <Badge text='dark' pill bg='warning'>
                TEMP
              </Badge>
            ) : undefined}
          </Container>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default CustomerCard;
