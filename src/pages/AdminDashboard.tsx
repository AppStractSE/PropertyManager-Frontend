import { motion } from "framer-motion";
import { useState } from "react";
import { Button, Col, Container, Form, Nav, Row, Tab, Table } from "react-bootstrap";
import { AiOutlineHeart, AiOutlinePlus, AiOutlineTeam } from "react-icons/ai";
import { IoBriefcaseOutline } from "react-icons/io5";
import { RiTodoLine } from "react-icons/ri";
import { useQuery, useQueryClient } from "react-query";
import {
  AreaResponseDto,
  ChoreCommentResponseDto,
  ChoreResponseDto,
  ChoreStatusResponseDto,
  Client,
  CustomerChoreResponseDto,
  CustomerResponseDto,
  Periodic,
  TeamMemberResponseDto,
  TeamResponseDto,
  UserInfoDto
} from "../api/client";
import CustomerGraph from "../components/admindashboard/CustomerGraph";
import CustomerTable from "../components/admindashboard/CustomerTable";
import Overview from "../components/admindashboard/Overview";
import useAxios from "../hooks/useAxios";
const AdminDashboard = () => {
  const [addAreaModal, showAddAreaModal] = useState(false);
  const [addTeamModal, showAddTeamModal] = useState(false);
  const [addCustomerModal, showAddCustomerModal] = useState(false);
  const [addCustomerChoreModal, showAddCustomerChoreModal] = useState(false);
  // const fetchAreas = useAxios({ url: "/area", method: "get" });
  // const fetchCustomers = useAxios({ url: "/customer", method: "get" });
  // const fetchTeams = useAxios({ url: "/team", method: "get" });
  // const fetchPeriodics = useAxios({ url: "/periodic", method: "get" });
  // const fetchChores = useAxios({ url: "/chore", method: "get" });
  const client = new Client();
  const queryClient = useQueryClient();
  const {
    data: areas,
    error: areasError,
    isLoading: areasLoading,
  } = useQuery<AreaResponseDto[]>(["areas"], async () => await client.area_GetAllAreas(), {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const {
    data: teams,
    error: teamsError,
    isLoading: teamsLoading,
  } = useQuery<TeamResponseDto[]>(["teams"], async () => await client.team_GetAllTeams(), {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const {
    data: customers,
    error: customersError,
    isLoading: customersLoading,
  } = useQuery<CustomerResponseDto[]>(
    ["customers"],
    async () => await client.customer_GetAllCustomers(),
    {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );
  const {
    data: periodics,
    error: periodicsError,
    isLoading: periodicsLoading,
  } = useQuery<Periodic[]>(["periodics"], async () => await client.periodic_GetAllPeriodics(), {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const {
    data: chores,
    error: choresError,
    isLoading: choresLoading,
  } = useQuery<ChoreResponseDto[]>(["chores"], async () => await client.chore_GetAllChores(), {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { data: customerChores } = useQuery<CustomerChoreResponseDto[]>(
    ["customerchores"],
    async () => client.customerChore_GetAllChores(),
  );

  const { data: choreComments } = useQuery<ChoreCommentResponseDto[]>(["chorecomments"], async () =>
    client.choreComment_GetAllChoreComments(),
  );

  const { data: latestChoreComments } = useQuery<ChoreCommentResponseDto[]>(
    ["latestchorecomments"],
    async () => client.choreComment_GetLatestFiveChoreComments(),
  );

  const { data: users } = useQuery<UserInfoDto[]>("users", async () =>
    client.authenticate_GetAllUsers(),
  );

  const { data: teamMembers } = useQuery<TeamMemberResponseDto[]>("teamMembers", async () =>
    client.teamMember_GetAllTeamMembers(),
  );

  const { data: choreStatuses } = useQuery<ChoreStatusResponseDto[]>("choreStatuses", async () =>
    client.choreStatus_GetAllChoreStatuses(),
  );

  console.log(choreStatuses)

  return (
    <motion.div
      className='d-flex'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Container className='p-3'>
        <Tab.Container id='left-tabs-example' defaultActiveKey='zero'>
          <Row>
            <Col sm={12} md={12} lg={2}>
              <Nav variant='pills' className='flex-column'>
                <Nav.Item>
                  <Nav.Link
                    eventKey='zero'
                    className='d-flex align-items-center gap-4'
                    onClick={() => queryClient.invalidateQueries("latestchorecomments")}
                  >
                    <AiOutlineHeart size={24} />
                    <div>Översikt</div>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='first' className='d-flex align-items-center gap-4'>
                    <IoBriefcaseOutline size={24} />
                    <div>Kunder</div>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='second' className='d-flex align-items-center gap-4'>
                    <AiOutlineTeam size={24} />
                    <div>Teams</div>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='third' className='d-flex align-items-center gap-4'>
                    <RiTodoLine size={24} />
                    <div>Sysslor</div>
                  </Nav.Link>
                </Nav.Item>
                <hr className='navbar-divider px-4 my-4 opacity-70'></hr>
                <Nav.Item>
                  <Nav.Link eventKey='fourth' className='d-flex align-items-center gap-4'>
                    <AiOutlinePlus size={24} />
                    <div>Skapa</div>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={12} md={12} lg={12 - 2}>
              <Tab.Content>
                <Tab.Pane eventKey='zero'>
                  {latestChoreComments && <Overview chorecomments={latestChoreComments} />}
                </Tab.Pane>
                <Tab.Pane eventKey='first'>
                  <div className='fs-4 mb-2'>Kundöversikt</div>
                  <CustomerGraph />
                  {teamMembers && customers && teams && (
                    <CustomerTable customers={customers} teams={teams} teammembers={teamMembers} />
                  )}
                  {/* <GenericTable title="Kunder" tableHeaders={["Kundnamn", "Adress", "Team"]} /> */}
                </Tab.Pane>
                <Tab.Pane eventKey='second'>
                  <Container>
                    <div className='fs-4 mb-2'>Team</div>
                    <Table hover>
                      <thead>
                        <tr>
                          <th style={{ textTransform: "uppercase", fontSize: 12 }}>Teamnamn</th>
                          <th style={{ textTransform: "uppercase", fontSize: 12 }}>Medlemmar</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {teams?.map((team) => (
                          <tr>
                            <td>{team.name}</td>
                            <td>
                              {teamMembers
                                ?.filter((x) => x.teamId === team.id)
                                .map((teammember) => (
                                  <div>
                                    {
                                      users?.find((user) => teammember.userId === user.userId)
                                        ?.displayName
                                    }
                                  </div>
                                ))}
                            </td>
                            <td>
                              <Button variant='outline-primary' size='sm'>
                                Visa mer
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Container>
                </Tab.Pane>
                <Tab.Pane eventKey='fourth'>
                  <Container>
                    <div className='fs-4 mb-2'>Skapa</div>
                    <Tab.Container defaultActiveKey="first">
          <Nav variant="pills" className="flex-row">
            <Nav.Item>
              <Nav.Link eventKey="first">Kund</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Syssla</Nav.Link>
            </Nav.Item>
          </Nav>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <div className="fs-4 mb-3 mt-3">Skapa kund</div>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Kundnamn</Form.Label>
                  <Form.Control type="text" placeholder="Kundnamn" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Adress</Form.Label>
                  <Form.Control type="text" placeholder="Adress" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Team</Form.Label>
                  <Form.Control as="select">
                    {teams?.map((team) => (
                      <option>{team.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Skapa
                </Button>
                
              </Form>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <div className="fs-4 mb-3 mt-3">Skapa syssla</div>
              <Form>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Namn</Form.Label>
                  <Form.Control type="text" placeholder="Namn på syssla" />
                </Form.Group>
                  <Form.Group className="mb-3" controlId="category">
                  <Form.Label>Huvudkategori</Form.Label>
                  <Form.Control as="select">
                    <option>SE1.2.3.4.255</option>
                    <option>KR1.2.2.1</option>
                    <option>SKK1.1.2.1</option>
                    <option>SKK1.1.2.2</option>
                    <option>SKK1.1.2.2.3</option>
                    </Form.Control>
                    </Form.Group>
                </Form>
            </Tab.Pane>
          </Tab.Content>
        </Col>
    </Tab.Container>
                  </Container>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
      {/* <div>
        <div className='mb-4 mt-2'>
          <ButtonGroup size='lg' aria-label='Basic example'>
            <Button variant='primary'>Kunder</Button>
            <Button variant='primary'>Teams</Button>
            <Button variant='primary'>Sysslor</Button>
          </ButtonGroup>
        </div>
        <div>
          <Row className='d-flex gap-2'>
            {customers?.map((customer) => (
              <Card key={customer.id} className='col col-xl-3 col-lg-4 col-sm-6'>
                <Card.Header className='d-flex align-items-center p-2'>
                  <div className='me-auto'>
                    <Card.Title>{customer.name}</Card.Title>
                    <div>{customer.address}</div>
                  </div>
                  <IoEllipsisVertical
                    size={32}
                    onClick={() => console.log("Open dropdown with options")}
                  />
                </Card.Header>
                <Card.Body className='d-flex gap-2 flex-column'>
                  <Card className='container' onClick={() => showAddCustomerChoreModal(true)}>
                    <Card.Body className='d-flex'>
                      <div className='me-auto'>Lägg till syssla</div>
                      <AiOutlinePlus size={28} />
                    </Card.Body>
                  </Card>
                  {customerChores?.filter((x) => x.customerId === customer.id).length === 0 ? (
                    <Card className='container'>
                      <Card.Body className='d-flex'>
                        <div className='me-auto'>Denna kund har inga sysslor</div>
                      </Card.Body>
                    </Card>
                  ) : (
                    <div className='d-flex gap-2 flex-column'>
                      {customerChores
                        ?.filter((x) => x.customerId === customer.id)
                        .map((customerChore) => (
                          <Card className='container' key={customerChore.id}>
                            <Card.Body className='d-flex'>
                              <div className='me-auto'>{customerChore.chore?.title}</div>
                              <IoEllipsisVertical
                                className='ms-5'
                                size={28}
                                onClick={() => console.log("Open dropdown with options")}
                              />
                            </Card.Body>
                          </Card>
                        ))}
                    </div>
                  )}
                </Card.Body>
              </Card>
            ))}
          </Row>
        </div>
      </div> */}
    </motion.div>
  );
};

export default AdminDashboard;
