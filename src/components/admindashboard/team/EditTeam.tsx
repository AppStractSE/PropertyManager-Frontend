import { useState } from "react";
import { Badge, Button, Form, Spinner } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import {
  PutTeamMemberRequestDto,
  TeamMemberResponseDto,
  TeamResponseDto,
  UserInfoDto,
} from "../../../api/client";
import { useClient } from "../../../contexts/ClientContext";

interface Props {
  team: TeamResponseDto;
  teammembers: TeamMemberResponseDto[];
  users: UserInfoDto[];
}

const EditTeam = ({ team, teammembers, users }: Props) => {
  const [teamName, setTeamName] = useState(team.name);
  const [teamMembers, setTeamMembers] = useState<PutTeamMemberRequestDto[]>(teammembers);
  const client = useClient();
  const queryClient = useQueryClient();
  const { mutate: updateTeam, isLoading: updatingTeam } = useMutation(
    async () => {
      return await client.team_PutTeam(teamObject);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("teams");
        updateTeamMembers();
        queryClient.invalidateQueries("teamMembers");
      },
    },
  );
  const { mutate: updateTeamMembers, isLoading: updatingTeamMembers } = useMutation(async () => {
    return await client.teamMember_PutTeamMembers({
      teamMembers: teamMembers.map((tm) => {
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
        <div className='d-flex row'>
          {users.map((user) => (
            <div className='d-flex align-items-center col-6 gap-2 mt-1' key={user.userId}>
              <Form.Check
                className='checkbox'
                type='checkbox'
                value={user.userId}
                checked={teamMembers.some((tm) => tm.userId === user.userId)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setTeamMembers([
                      ...teamMembers,
                      {
                        // id: "",
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
              <div className='d-flex align-items-center' style={{ fontSize: ".9rem" }}>
                {teamMembers
                  .filter((tm) => tm.userId === user.userId)
                  .map((tm) => (
                    <Badge
                      key={tm.userId}
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
        onClick={() => {
          updateTeam();
        }}
        disabled={updatingTeam}
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
