import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { TeamMemberResponseDto, TeamResponseDto, UserInfoDto } from "../../../api/client";
import AddTeam from "../team/add/AddTeam";

interface Props {
  teams: TeamResponseDto[];
  users: UserInfoDto[];
  teammembers: TeamMemberResponseDto[];
}

const CreateTeam = ({ teams, users, teammembers }: Props) => {
  return (
    <Row className='my-5'>
      <Col md={12} lg={4} className='mb-3'>
        <Card className='default-cursor'>
          <Card.Header className='fs-5'>Nuvarande teams</Card.Header>
          <Card.Body className='justify-content-center d-flex flex-column'>
            {teams
              .sort((a, b) => a.name!.localeCompare(b.name!))
              .map((team) => (
                <div className='mb-2' key={team.id}>
                  <Card.Title>{team.name}</Card.Title>
                  {teammembers
                    .filter((tm) => tm.teamId === team.id && tm.isTemporary === false)
                    .map((tm) => (
                      <Card.Text key={tm.userId}>
                        {
                          users
                            .sort((a, b) => a.displayName!.localeCompare(b.displayName!))
                            .find((u) => u.userId === tm.userId)?.displayName
                        }
                      </Card.Text>
                    ))}
                </div>
              ))}
          </Card.Body>
        </Card>
      </Col>
      <Col md={12} lg={8}>
        <Card className='default-cursor'>
          <Card.Header className='fs-5'>Skapa team</Card.Header>
          <Card.Body className='justify-content-center d-flex flex-column'>
            <AddTeam users={users} teammembers={teammembers} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default CreateTeam;
