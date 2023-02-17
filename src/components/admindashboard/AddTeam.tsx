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
  const [teammembers, setTeammembers] = useState<PostTeamMemberRequestDto[]>([]);
  const queryClient = useQueryClient();
  const client = new Client();
  const { mutate: postTeamMember, isLoading: postingTeamMember } = useMutation(
    async (id: string) => {
      return await client.teamMember_PostTeamMembers({
        teamMembers: teammembers.map((tm) => {
          return { ...tm, teamId: id };
        }),
      });
    },
    {
      onSuccess: (test) => {
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
      onSuccess: (asd) => {
        console.log("Successfully posted team");
        queryClient.invalidateQueries("teams");
        console.log(asd.id);
        postTeamMember(asd.id);
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
        {/* <Form.Select multiple itemType="checkbox"
          onChange={(e) => {
            if (e.target.value !== "") {
              setTeammembers([
                ...teammembers,
                { userId: e.target.value, teamId: "", isTemporary: false },
              ]);
            }
          }}

          className='form-active'
        >
          <option value=''>Välj teammedlem</option>
          {users.map((user) => (
            <option value={user.userId}>{user.displayName}</option>
          ))} */}

        {users.map((user) => (
          <Form.Check
            type='checkbox'
            label={user.displayName}
            checked={teammembers.some((tm) => tm.userId === user.userId)}
            onChange={(e) => {
              if (e.target.checked) {
                setTeammembers([
                  ...teammembers,
                  { userId: user.userId, teamId: "", isTemporary: false },
                ]);
              } else {
                setTeammembers(teammembers.filter((tm) => tm.userId !== user.userId));
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
