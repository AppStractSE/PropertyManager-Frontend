import React, { useState } from "react";
import { Card } from "react-bootstrap";
import {
  AreaResponseDto,
  ChoreResponseDto,
  CustomerChoreResponseDto,
  CustomerResponseDto,
  Periodic,
  TeamMemberResponseDto,
  TeamResponseDto,
} from "../../../api/client";
import Search from "../../../components/Search";
import CustomerTable from "../../../components/admindashboard/customer/table/CustomerTable";

interface Props {
  areas: AreaResponseDto[];
  chores: ChoreResponseDto[];
  customers: CustomerResponseDto[];
  customerchores: CustomerChoreResponseDto[];
  periodics: Periodic[];
  teams: TeamResponseDto[];
  teammembers: TeamMemberResponseDto[];
}

const CustomerTab = ({
  areas,
  chores,
  customers,
  customerchores,
  periodics,
  teams,
  teammembers,
}: Props) => {
  const [search, setSearch] = useState("");
  return (
    <>
      <Card className='default-cursor'>
        <Card.Header className='fs-4 mb-2'>Kunder</Card.Header>
        <Card.Body>
          <Search value={search} onChange={(value) => setSearch(value)} placeholder={"kunder"} />
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
        </Card.Body>
      </Card>
    </>
  );
};

export default CustomerTab;
