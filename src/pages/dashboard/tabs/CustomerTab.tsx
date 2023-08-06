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
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 5,
  });

  const filteredCustomers = customers.filter((x) =>
    x.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const maxPage = Math.ceil(filteredCustomers.length / pagination.itemsPerPage);

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = parseInt(e.target.value);
    setPagination((prevPagination) => ({
      ...prevPagination,
      itemsPerPage: newItemsPerPage,
      currentPage: 1,
    }));
  };

  const handlePageChange = (newPage: number) => {
    const validPage = Math.max(1, Math.min(newPage, maxPage));
    setPagination((prevPagination) => ({ ...prevPagination, currentPage: validPage }));
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPagination((prevPagination) => ({ ...prevPagination, currentPage: 1 }));
  };

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

        <Card className='mt-4'>
          <div className='row p-3'>
            <div className='col-9'>
              <div className='d-flex align-items-center gap-2'>
                <div className='d-flex align-items-center gap-2'>
                  <div className='fs-7'>Visa</div>
                  <Form.Select
                    value={pagination.itemsPerPage}
                    className='rounded-0 w-auto'
                    onChange={handleItemsPerPageChange}
                  >
                    <option value={1}>1</option>
                    <option value={3}>3</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </Form.Select>
                  <div className='fs-7'>per sida</div>
                </div>
              </div>
            </div>
            <div className='col-3'>
              <Search value={search} onChange={handleSearchChange} placeholder={"kunder"} />
            </div>
          </div>
          <CustomerTable
            areas={areas}
            chores={chores}
            customers={filteredCustomers}
            customerchores={customerchores}
            teams={teams}
            teammembers={teammembers}
            periodics={periodics}
            currentPage={pagination.currentPage}
            itemsPerPage={pagination.itemsPerPage}
          />
          <div className='col-12 d-flex fs-7 my-3 justify-content-center gap-2'>
            <Button
              variant='outline-primary'
              onClick={() => handlePageChange(pagination.currentPage - 1)}
            >
              ❮
            </Button>
            {Array.from({ length: maxPage }, (_, index) => (
              <Button
                variant={`${pagination.currentPage === index + 1 ? "primary" : "outline-primary"}`}
                key={index}
                // className={` ${
                //   pagination.currentPage === index + 1 ? "primary" : "outline-primary"
                // }`}
                onClick={() => handlePageChange(index + 1)}
                // style={{ cursor: "pointer" }}
              >
                {index + 1}
              </Button>
            ))}
            <Button
              variant='outline-primary'
              onClick={() => handlePageChange(pagination.currentPage + 1)}
            >
              ❯
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default CustomerTab;
