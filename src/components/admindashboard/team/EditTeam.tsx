import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { Client, TeamMemberResponseDto, TeamResponseDto } from "../../../api/client";

interface Props {
  team: TeamResponseDto;
  teammembers: TeamMemberResponseDto[];
  onHide: () => void;
}

const EditTeam = ({ team, teammembers, onHide }: Props) => {
  const [teamName, setTeamName] = useState(team.name);
  const client = new Client();
  const queryClient = useQueryClient();
  const { mutate: updateTeam, isLoading: updatingTeam } = useMutation(
    async () => {
      return await client.team_PutTeam(teamObject);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("team");
        queryClient.invalidateQueries(["teammembers"]);
      },
    },
  );

  const teamObject = {
    id: team.id,
    name: teamName,
  };

  return (
    <Form className='d-flex flex-column gap-4'>
      <Form.Group className='d-flex gap-4'>
        <Form.Group className='flex-grow-1'>
          <Form.Label>Teamnamn</Form.Label>
          <Form.Control
            autoFocus={true}
            type='text'
            onChange={(e) => setTeamName(e.target.value)}
            value={teamName}
          />
        </Form.Group>
      </Form.Group>
      <Button
        className='w-50'
        onClick={() => updateTeam()}
        disabled={updatingTeam || teamName === team.name}
      >
        {updatingTeam && (
          <Spinner
            className='mx-2'
            size='sm'
            as='span'
            animation='border'
            role='status'
            aria-hidden='true'
          />
        )}
        {updatingTeam ? "Sparar..." : "Spara"}
      </Button>
    </Form>
  );
};

export default EditTeam;
