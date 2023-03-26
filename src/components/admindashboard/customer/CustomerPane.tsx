import { useState } from "react";
import { Button } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import {
  AreaResponseDto,
  ChoreResponseDto,
  CustomerChoreResponseDto,
  CustomerResponseDto,
  Periodic,
  TeamMemberResponseDto,
  TeamResponseDto,
  UserInfoDto,
} from "../../../api/client";
import Search from "../../Search";
import AddCustomerModal from "./add/AddCustomerModal";
import CustomerTable from "./table/CustomerTable";

interface Props {
  areas: AreaResponseDto[];
  chores: ChoreResponseDto[];
  customers: CustomerResponseDto[];
  customerchores: CustomerChoreResponseDto[];
  periodics: Periodic[];
  teams: TeamResponseDto[];
  teammembers: TeamMemberResponseDto[];
  users: UserInfoDto[];
}

const CustomerPane = ({
  areas,
  chores,
  customers,
  customerchores,
  periodics,
  teams,
  teammembers,
}: Props) => {
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [search, setSearch] = useState("");
  return (
    <>
      <div className='fs-4 mb-2'>Kundöversikt</div>
      <div className='d-flex align-items-center gap-4 mb-3'>
        <Search value={search} onChange={(value) => setSearch(value)} placeholder='kund' />
        <Button
          className='d-flex align-items-center gap-2 align-self-stretch'
          onClick={() => setShowAddCustomerModal(!showAddCustomerModal)}
        >
          <AiOutlinePlus size={18} />
          <div>Skapa ny kund</div>
        </Button>
      </div>
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
      <AddCustomerModal
        show={showAddCustomerModal}
        onHide={() => setShowAddCustomerModal(!showAddCustomerModal)}
        teams={teams}
        areas={areas}
      />
    </>
  );
};

export default CustomerPane;
