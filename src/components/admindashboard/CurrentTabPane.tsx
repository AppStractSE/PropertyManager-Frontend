import { useEffect, useState } from "react";
import { Card, Tab } from "react-bootstrap";
import {
  AreaResponseDto,
  ChoreResponseDto,
  CustomerChoreResponseDto,
  CustomerResponseDto,
  Periodic,
  TeamMemberResponseDto,
  TeamResponseDto,
  UserInfoDto
} from "../../api/client";
import Search from "../Search";
import CustomerTable from "./customer/table/CustomerTable";
import TeamTable from "./team/table/TeamTable";
interface Props {
  areas: AreaResponseDto[];
  chores: ChoreResponseDto[];
  customers: CustomerResponseDto[];
  customerchores: CustomerChoreResponseDto[];
  periodics: Periodic[];
  teams: TeamResponseDto[];
  teammembers: TeamMemberResponseDto[];
  users: UserInfoDto[];
  tab: string;
}

const CurrentTabPane = ({
  tab,
  areas,
  chores,
  customers,
  customerchores,
  periodics,
  teams,
  teammembers,
  users,
}: Props) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch("");
  }, [tab]);

  return (
    <Tab.Pane eventKey={tab}>
    <Card className='default-cursor'>
      <Card.Header className='fs-4 mb-2'>{tab}</Card.Header>
      <Card.Body>
        <Search
          value={search}
          onChange={(value) => setSearch(value)}
          placeholder={tab.toLowerCase()}
          />
        {tab === "Kunder" ? (
          <CustomerTable
          search={search}
          areas={areas}
          chores={chores}
          customers={customers}
          customerchores={customerchores}
          teams={teams}
          teammembers={teammembers}
          periodics={periodics}
          />
          ) : tab === "Teams" ? (
            <TeamTable
            search={search}
            teams={teams}
            teammembers={teammembers}
            users={users}
            customers={customers}
            />
            ) : undefined}
      </Card.Body>
    </Card>
      </Tab.Pane>
  );
};

export default CurrentTabPane;
