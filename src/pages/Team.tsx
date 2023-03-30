import { Container } from "react-bootstrap";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { TeamResponseDto } from "../api/client";
import { useClient } from "../contexts/ClientContext";
import { useQueries } from "../hooks/useQueries";

const Team = () => {
  const client = useClient();
  const { id } = useParams();
  const { customers, teamMembers, users } = useQueries();
  const { data: team } = useQuery<TeamResponseDto>(["team", id], async () =>
    client.team_GetTeamById(id),
  );
  
  if(!customers || !team || !teamMembers || !users) return null;

  return (
    <Container>
      <div>{team.name}</div>
      {users.filter((x) => teamMembers.find((y) => y.userId === x.userId)?.teamId === id)
        .map((user) => {
          return <div key={user.userId}>{user.displayName}
          </div>;
        })
        }
      {customers.filter((x) => x.teamId === id)
        .map((customer) => {
          return <div key={customer.id}>{customer.name}</div>;
        })}

    </Container>
  );
};

export default Team;
