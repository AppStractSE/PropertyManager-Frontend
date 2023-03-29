import { Card, Col, Row } from "react-bootstrap";
import {
  AreaResponseDto,
  CustomerResponseDto,
  TeamResponseDto,
  UserInfoDto,
} from "../../../api/client";
import AddCustomer from "../customer/add/AddCustomer";

interface Props {
  teams: TeamResponseDto[];
  areas: AreaResponseDto[];
  customers: CustomerResponseDto[];
  users: UserInfoDto[];
}

const CreateCustomer = ({ customers, teams, areas }: Props) => {
  return (
    <Row className='my-5'>
      <Col md={12} lg={4}>
        <Card className='default-cursor'>
          <Card.Header className='fs-5'>Nuvarande kunder</Card.Header>
          <Card.Body className='justify-content-center d-flex flex-column'>
            {customers
              .sort((a, b) => a.name!.localeCompare(b.name!))
              .map((customer) => (
                <Card.Text key={customer.id}>{customer.name}</Card.Text>
              ))}
          </Card.Body>
        </Card>
      </Col>
      <Col md={12} lg={8}>
        <Card className='default-cursor'>
          <Card.Header className='fs-5'>Skapa kund</Card.Header>
          <Card.Body className='justify-content-center d-flex flex-column'>
            <AddCustomer teams={teams} areas={areas} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default CreateCustomer;
