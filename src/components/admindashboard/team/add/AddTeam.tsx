import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  PostTeamMemberRequestDto,
  TeamMemberResponseDto,
  UserInfoDto,
} from "../../../../api/client";
import { useClient } from "../../../../contexts/ClientContext";
import toasts from "../../../../data/toasts";

interface Props {
  users: UserInfoDto[];
  teammembers: TeamMemberResponseDto[];
  close?: () => void;
}

const AddTeam = ({ users, teammembers, close }: Props) => {
  const [teamValue, setTeamValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [teamMembers, setTeamMembers] = useState<PostTeamMemberRequestDto[]>([]);
  const queryClient = useQueryClient();
  const client = useClient();
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
        queryClient.invalidateQueries("teamMembers");
        setTeamValue("");
        setTeamMembers([]);
        if (close) close();
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
        queryClient.invalidateQueries("teams");
        postTeamMember(team.id);
        toast.success(toasts.create.team.onMutate.message);
      },
    },
  );

  return (
    <Form>
      <Form.Group className='mb-3' controlId='formAddTeam'>
        <Form.Label>Namn</Form.Label>
        <Form.Control
          type='text'
          placeholder='Skriv in teamnamn'
          value={teamValue}
          onChange={(e) => setTeamValue(e.target.value)}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formAddTeamMember'>
        <Form.Label>Välj teammedlemmar</Form.Label>
        <Form.Text as='div' className='mb-2 mt-0'>
          Utgråade medlemmar ingår redan i ett team som ordinarie
        </Form.Text>
        <Form.Control
          className='mb-2'
          type='text'
          placeholder='Sök efter användare'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {users
          .filter((user) =>
            user.displayName!.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
          )
          .map((user) => (
            <div className='d-flex gap-2 align-items-center' key={user.userId}>
              <Form.Check
                type='checkbox'
                disabled={teammembers.some((member) => member.userId === user.userId)}
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
              <div
                className={
                  teammembers.some((member) => member.userId === user.userId)
                    ? "opacity-50"
                    : undefined
                }
              >
                {user.displayName}
              </div>
            </div>
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
