import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import {
  Client,
  PutTeamMemberRequestDto,
  TeamMemberResponseDto,
  TeamResponseDto,
  UserInfoDto,
} from "../../../api/client";
import EditTeam from "./EditTeam";

interface Props {
  team: TeamResponseDto;
  teammembers: TeamMemberResponseDto[];
  users: UserInfoDto[];
  onHide: () => void;
}

const EditTeams = ({ team, teammembers, users, onHide }: Props) => {
  const [teamName, setTeamName] = useState(team.name);
  const [teamMembers, setTeammembers] = useState<PutTeamMemberRequestDto[]>([]);
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
  const { mutate: updateTeamMembers, isLoading: updatingTeamMembers } = useMutation(async () => {
    return await client.teamMember_PutTeamMembers({
      teamMembers: teammembers.map((tm) => {
        return { ...tm, teamId: team.id };
      }),
    });
  });

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

      <Form.Group className='mb-3' controlId='formAddTeamMember'>
        <Form.Label>Teammedlem</Form.Label>
        <EditTeam users={users} team={team} teammembers={teammembers} />
        {users.map((user) => (
          <Form.Check
            type='checkbox'
            label={user.displayName}
            checked={teammembers?.find((tm) => tm.userId === user.userId)?.teamId === team.id}
            onChange={(e) => {
              if (e.target.checked) {
                setTeammembers([
                  ...teamMembers,
                  {
                    teamId: team.id,
                    userId: user.userId,
                    isTemporary: false,
                  },
                ]);
              } else {
                setTeammembers(teamMembers.filter((tm) => tm.userId !== user.userId));
              }
            }}
          />
        ))}
      </Form.Group>

      {teammembers
        ?.filter((x) => x.teamId === team.id)
        .map((teammember) => (
          <div>{users?.find((user) => teammember.userId === user.userId)?.displayName}</div>
        ))}

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

export default EditTeams;
