import { useState } from "react";
import { Badge, Button, Form, Spinner } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import {
  Client,
  PutTeamMemberRequestDto,
  TeamMemberResponseDto,
  TeamResponseDto,
  UserInfoDto,
} from "../../../api/client";

interface Props {
  team: TeamResponseDto;
  teammembers: TeamMemberResponseDto[];
  users: UserInfoDto[];
}

const EditTeam = ({ team, teammembers, users }: Props) => {
  const [teamName, setTeamName] = useState(team.name);
  const [teamMembers, setTeamMembers] = useState<PutTeamMemberRequestDto[]>(teammembers);
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
      <Form.Group className='flex-grow-1'>
        <Form.Label>Teamnamn</Form.Label>
        <Form.Control
          autoFocus={true}
          type='text'
          onChange={(e) => setTeamName(e.target.value)}
          value={teamName}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Teammedlemmar</Form.Label>
        <Form.Text as='div' className='mb-2 mt-0'>
          Ordinarie: {teamMembers.filter((x) => !x.isTemporary).length}st
        </Form.Text>
        <Form.Text as='div' className='mb-2 mt-0'>
          Temporära: {teamMembers.filter((x) => x.isTemporary).length}st
        </Form.Text>
        <div className='d-flex flex-column gap-2'>
          {users.map((user) => (
            <div className='d-flex gap-2 align-items-center'>
              <Form.Check
                className='checkbox'
                key={user.userId}
                type='checkbox'
                value={user.userId}
                checked={teamMembers.some((tm) => tm.userId === user.userId)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setTeamMembers([
                      ...teamMembers,
                      {
                        teamId: team.id,
                        userId: user.userId,
                        isTemporary: false,
                      },
                    ]);
                  } else {
                    setTeamMembers(teamMembers.filter((tm) => tm.userId !== user.userId));
                  }
                }}
              />
              <div className='me-2'>{user.displayName}</div>
              <div className="d-flex align-items-center" style={{ fontSize: ".9rem" }}>
                {teamMembers
                  .filter((tm) => tm.userId === user.userId)
                  .map((tm) => (
                    <Badge
                      style={{ cursor: "pointer", userSelect: "none" }}
                      pill
                      text={tm.isTemporary ? "dark" : undefined}
                      bg={tm.isTemporary ? "warning" : "primary"}
                      className='text-uppercase'
                      onClick={() =>
                        setTeamMembers(
                          teamMembers.map((teamMember) => {
                            if (teamMember.userId === tm.userId)
                              return { ...teamMember, isTemporary: !teamMember.isTemporary };
                            return teamMember;
                          }),
                        )
                      }
                    >
                      {tm.isTemporary ? "Tillfällig" : "Ordinarie"}
                    </Badge>
                  ))}
              </div>
            </div>
          ))}
        </div>
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
