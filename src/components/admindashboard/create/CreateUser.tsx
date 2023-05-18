import { Card, Col, Row } from "react-bootstrap";
import { TeamResponseDto, UserInfoDto } from "../../../api/client";
import AddUser from "../user/add/AddUser";

interface Props {
  users: UserInfoDto[];
  teams: TeamResponseDto[];
}

const CreateUser = ({ users, teams }: Props) => {
  return (
    <Row className='my-5'>
      <Col md={12} lg={4} className='mb-3'>
        <Card className='default-cursor'>
          <Card.Header className='fs-5'>Nuvarande användare</Card.Header>
          <Card.Body className='justify-content-center d-flex flex-column'>
            {users
              .sort((a, b) => a.displayName!.localeCompare(b.displayName!))
              .map((user) => (
                <Card.Text key={user.userId}>{user.displayName}</Card.Text>
              ))}
          </Card.Body>
        </Card>
      </Col>
      <Col md={12} lg={8}>
        <Card className='default-cursor'>
          <Card.Header className='fs-5'>Skapa användare</Card.Header>
          <Card.Body className='justify-content-center d-flex flex-column'>
            <AddUser users={users} teams={teams} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default CreateUser;
