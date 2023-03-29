import { useState } from "react";
import { Container, Fade, Nav, Tab } from "react-bootstrap";
import {
  AreaResponseDto,
  CategoryResponseDto,
  ChoreResponseDto,
  CustomerChoreResponseDto,
  CustomerResponseDto,
  Periodic,
  TeamMemberResponseDto,
  TeamResponseDto,
  UserInfoDto,
} from "../../../api/client";
import navMenu from "../data/navMenu";
import CreateArea from "./CreateArea";
import CreateChores from "./CreateChores";
import CreateCustomer from "./CreateCustomer";
import CreateTeam from "./CreateTeam";
import CreateUser from "./CreateUser";

interface Props {
  areas: AreaResponseDto[];
  categories: CategoryResponseDto[];
  chores: ChoreResponseDto[];
  customers: CustomerResponseDto[];
  customerchores: CustomerChoreResponseDto[];
  periodics: Periodic[];
  teams: TeamResponseDto[];
  teammembers: TeamMemberResponseDto[];
  users: UserInfoDto[];
}

const CreatePane = ({
  areas,
  categories,
  chores,
  customers,
  customerchores,
  periodics,
  teams,
  teammembers,
  users,
}: Props) => {
  const [tab, setTab] = useState("Kund");
  return (
    <Tab.Container defaultActiveKey='Kund' transition={Fade}>
      <Nav
        variant='pills'
        className='flex-row w-100 justify-content-center gap-5 py-2 card default-cursor'
      >
        {navMenu.map((item) => (
          <Nav.Item key={item.name}>
            <Nav.Link eventKey={item.name} onClick={() => setTab(item.name)}>
              {item.name}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <Container>
        <Tab.Content>
          <Tab.Pane eventKey={tab} transition={Fade}>
            {tab === "Kund" ? (
              <CreateCustomer teams={teams} areas={areas} customers={customers} users={users} />
            ) : tab === "Syssla" ? (
              <CreateChores
                categories={categories}
                chores={chores}
                customers={customers}
                customerchores={customerchores}
                periodics={periodics}
              />
            ) : tab === "Team" ? (
              <CreateTeam teams={teams} users={users} teammembers={teammembers} />
            ) : tab === "Användare" ? (
              <CreateUser users={users} teams={teams} />
            ) : tab === "Område" ? (
              <CreateArea areas={areas} />
            ) : undefined}
          </Tab.Pane>
        </Tab.Content>
      </Container>
    </Tab.Container>
  );
};

export default CreatePane;
