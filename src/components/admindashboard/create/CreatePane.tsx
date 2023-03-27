import { Card, Col, Container, Nav, Row, Tab } from "react-bootstrap";
import {
  AreaResponseDto,
  CategoryResponseDto,
  ChoreResponseDto,
  CustomerChoreResponseDto,
  CustomerResponseDto,
  Periodic,
  TeamMemberResponseDto,
  TeamResponseDto,
  UserInfoDto,
} from "../../../api/client";
import AddCustomer from "../customer/add/AddCustomer";
import CreateArea from "./CreateArea";
import CreateChores from "./CreateChores";
import CreateTeam from "./CreateTeam";
import CreateUser from "./CreateUser";

interface Props {
  areas: AreaResponseDto[];
  categories: CategoryResponseDto[];
  chores: ChoreResponseDto[];
  customers: CustomerResponseDto[];
  customerchores: CustomerChoreResponseDto[];
  periodics: Periodic[];
  teams: TeamResponseDto[];
  teammembers: TeamMemberResponseDto[];
  users: UserInfoDto[];
}

const CreatePane = ({
  areas,
  categories,
  chores,
  customers,
  customerchores,
  periodics,
  teams,
  teammembers,
  users,
}: Props) => {
  return (
    <Tab.Container defaultActiveKey='first'>
      <Nav
        variant='pills'
        className='flex-row w-100 justify-content-center gap-5 py-2 card default-cursor'
      >
        <Nav.Item>
          <Nav.Link eventKey='first'>Kund</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='second'>Syssla</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='third'>Team</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='fourth'>Användare</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='fifth'>Område</Nav.Link>
        </Nav.Item>
      </Nav>
      <Container>
        <Tab.Content>
          <Tab.Pane eventKey='first'>
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
          </Tab.Pane>
          <Tab.Pane eventKey='second' className='mt-5'>
            <CreateChores
              categories={categories}
              chores={chores}
              customers={customers}
              customerchores={customerchores}
              periodics={periodics}
            />
          </Tab.Pane>
          <Tab.Pane eventKey='third'>
            <CreateTeam teams={teams} users={users} teammembers={teammembers} />
          </Tab.Pane>
          <Tab.Pane eventKey='fourth'>
            <CreateUser users={users} teams={teams} />
          </Tab.Pane>
          <Tab.Pane eventKey='fifth'>
            <CreateArea areas={areas} />
          </Tab.Pane>
        </Tab.Content>
      </Container>
    </Tab.Container>
  );
};

export default CreatePane;
