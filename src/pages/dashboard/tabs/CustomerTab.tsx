import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { HiOutlineDocumentReport } from "react-icons/hi";
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
import LineChart from "../charts/LineChart";

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
      <div className='p-4 border-1 border-bottom'>
        <div className='h2 mb-0'>Kunder</div>
      </div>
      <div className='p-4'>
        <div className='d-flex gap-2'>
          <Button className='d-flex gap-2 align-items-center justify-content-center'>
            <HiOutlineDocumentReport size={24} />
            <div>Skapa kund</div>
          </Button>
        </div>

        <div className='row mt-4'>
          <div className='col-12 col-md-6 col-xl-3'>
            <Card className='d-flex flex-row pt-3 px-3 default-cursor h-100'>
              <div className='col-6'>
                <div className='h5 mb-0'>Senaste grejjen</div>
              </div>
              <div className='col-6'>
                <LineChart data={[5, 27, 12, 30, 40]} />
              </div>
            </Card>
          </div>

          <div className='col-12 col-md-6 col-xl-3'>
            <Card className='d-flex justify-content-between h-100'>
              <LineChart data={[5, 27, 12, 30, 40]} />
            </Card>
          </div>

          <div className='col-12 col-md-6 col-xl-3'>
            <Card className='d-flex justify-content-between h-100'>
              <LineChart data={[5, 27, 12, 30, 40]} />
            </Card>
          </div>

          <div className='col-12 col-md-6 col-xl-3'>
            <Card className='d-flex justify-content-between h-100'>
              <LineChart data={[5, 27, 12, 30, 40]} />
            </Card>
          </div>
        </div>

        <div className='row mt-4'>
          <div className='col-12'>
            <Search value={search} onChange={(value) => setSearch(value)} placeholder={"kunder"} />
            <Card className='mt-4 overflow-hidden' style={{maxHeight: 300}}>
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
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerTab;
