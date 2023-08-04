import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
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
  const [sort, setSort] = useState(0);
  const [pagination, setPagination] = useState(5);
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

        <Card className='mt-4'>
          <div className='row p-3'>
            <div className='col-9'>
              <div className='d-flex align-items-center gap-2'>
                <div className="d-flex align-items-center gap-2">
                <div className='fs-7'>Visa</div>
                  <Form.Select
                    value={pagination}
                    className='rounded-0 w-auto'
                    onChange={(e) => setPagination(parseInt(e.target.value))}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </Form.Select>
                  <div className='fs-7'>per sida</div>
                </div>

                <div className='d-flex align-items-center gap-2'>
                  <div className='fs-7'>Sorterat på:</div>
                  <Form.Select
                    value={sort}
                    className='rounded-0 w-auto'
                    onChange={(e) => setSort(parseInt(e.target.value))}
                  >
                    <option value={0}>Kundnamn A-Ö</option>
                    <option value={1}>Kundnamn Ö-A</option>
                    <option value={2}>Teamnamn A-Ö</option>
                    <option value={3}>Teamnamn Ö-A</option>
                    <option value={4}>Flest avklarade sysslor överst</option>
                    <option value={5}>Minst avklarade sysslor överst</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className='col-3'>
              <Search
                value={search}
                onChange={(value) => setSearch(value)}
                placeholder={"kunder"}
              />
            </div>
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
          <div className='col-12 d-flex fs-7 opacity-75'>
            <div className='p-3'>Prev</div>
            <div className='p-3'>1</div>
            <div className='p-3'>2</div>
            <div className='p-3'>3</div>
            <div className='p-3 me-auto'>Next</div>
            <div className='p-3'>Visar 10 av 250</div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default CustomerTab;
