import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { Client, PostTeamMemberRequestDto, TeamResponseDto, UserInfoDto } from "../../api/client";

interface Props {
  users: UserInfoDto[];
  teams: TeamResponseDto[];
}

const AddTeam = ({ users, teams }: Props) => {
  const [teamValue, setTeamValue] = useState("");
  const [teamMembers, setTeamMembers] = useState<PostTeamMemberRequestDto[]>([]);
  const queryClient = useQueryClient();
  const client = new Client();
  const { mutate: postTeamMember, isLoading: postingTeamMember } = useMutation(
    async (id: string) => {
      return await client.teamMember_PostTeamMembers({
        teamMembers: teamMembers.map((tm) => {
          return { ...tm, teamId: id };
        }),
      });
    },
    {
      onSuccess: () => {
        console.log("Successfully posted team member");
        queryClient.invalidateQueries("teamMembers");
        setTeamValue("");
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
  const { mutate: postTeam, isLoading: postingTeam } = useMutation(
    async () => {
      return await client.team_PostTeam({
        name: teamValue,
      });
    },
    {
      onSuccess: (team) => {
        console.log("Successfully posted team");
        queryClient.invalidateQueries("teams");
        postTeamMember(team.id);
      },
    },
  );

  return (
    <Form>
      <Form.Group className='mb-3' controlId='formAddTeam'>
        <Form.Label>Team</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter team name'
          value={teamValue}
          onChange={(e) => setTeamValue(e.target.value)}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formAddTeamMember'>
        <Form.Label>Teammedlem</Form.Label>
        {users.map((user) => (
          <Form.Check
            type='checkbox'
            label={user.displayName}
            checked={teamMembers.some((tm) => tm.userId === user.userId)}
            onChange={(e) => {
              if (e.target.checked) {
                setTeamMembers([
                  ...teamMembers,
                  { userId: user.userId, teamId: "", isTemporary: false },
                ]);
              } else {
                setTeamMembers(teamMembers.filter((tm) => tm.userId !== user.userId));
              }
            }}
          />
        ))}
      </Form.Group>

      <Button
        className='w-100'
        onClick={() => postTeam()}
        disabled={teamValue.length < 3 ? true : false}
      >
        Lägg till team
      </Button>
    </Form>
  );
};

export default AddTeam;
