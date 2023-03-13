import { Button, Modal, Nav, Tab } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import { useMutation, useQueryClient } from "react-query";
import { Client, CustomerResponseDto, TeamMemberResponseDto, TeamResponseDto, UserInfoDto } from "../../../api/client";
import EditTeam from "../team/EditTeam";

interface Props {
  show: boolean;
  onHide: () => void;
  team: TeamResponseDto;
  customers: CustomerResponseDto[];
  teammembers: TeamMemberResponseDto[];
  users: UserInfoDto[];
}

const EditTeamModal = ({ team, teammembers, users, customers, show, onHide }: Props) => {
  const client = new Client();
  const queryClient = useQueryClient();
  const {
    mutate: deleteTeam,
    error: deleteTeamError,
    isLoading: deleteTeamIsLoading,
  } = useMutation(
    ["deleteTeam", team.id],
    async () => await client.team_DeleteTeamById(team.id),

    {
      onSuccess: () => {
        queryClient.invalidateQueries("teams");
        console.log("success");
      },
    },

  );

  return (
    <Modal show={show} id='editTeam' onEscapeKeyDown={() => onHide()}>
      <Modal.Header closeButton onHide={() => onHide()}>
        <Modal.Title id='contained-modal-title-vcenter'>
          {team.name}{" "}
          <Button onClick={() => deleteTeam()}>
            <BsFillTrashFill className='ms-4' size={24} color={"red"} />
          </Button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='px-3 py-2 mb-2'>
        <Tab.Container defaultActiveKey='first'>
          <Nav variant='pills' className='flex-row mb-4'>
            <Nav.Item>
              <Nav.Link eventKey='first'>Översikt</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='second'>Inställningar</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey='first'>
              <div className="mb-2">
                <div className="fs-5">Kunder</div>
                {customers.map((customer) => {
                    return (
                      <div key={customer.id}>
                        {customer.name}
                      </div>
                    );
                
                })
                }
              </div>
              <div>
                <div className="fs-5">Teammedlemmar</div>
                {teammembers.filter(x => x.teamId === team.id).map((teammember) => {
                  return (
                    <div key={teammember.userId}>
                      {users?.find((user) => teammember.userId === user.userId)?.displayName}
                      </div>
                  );
                })}

              </div>
            </Tab.Pane>
            <Tab.Pane eventKey='second'>
              <EditTeam users={users} team={team} teammembers={teammembers} />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
    </Modal>
  );
};

export default EditTeamModal;
