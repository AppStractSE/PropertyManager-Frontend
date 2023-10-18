import { useState } from "react";
import { Form } from "react-bootstrap";
import {
  CustomerChoreResponseDto,
  CustomerResponseDto,
  Periodic,
  TeamResponseDto,
} from "../../../api/client";
import Search from "../../../components/Search";
import CustomerProgressCard from "../../../components/admindashboard/meeting/CustomerProgressCard";

interface Props {
  customers: CustomerResponseDto[];
  teams: TeamResponseDto[];
  customerchores: CustomerChoreResponseDto[];
  periodics: Periodic[];
}

const Meeting = ({ customers, teams, customerchores, periodics }: Props) => {
  const [teamValue, setTeamValue] = useState<string>("");
  const [periodValue, setPeriodValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  const handleSearch = (value: string) => {
    const filtered = customers.filter((customer) =>
      customer.name?.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredCustomers(filtered);
  };

  return (
    <>
      <div className='p-4 border-1 border-bottom'>
        <div className='h2 mb-0'>Veckomöte</div>
      </div>
      <div className='p-4'>
        <div className='row'>
          <Form.Group className='row'>
            <Form.Group className='mb-3 col-3'>
              <Form.Select
                value={""}
                onChange={(e) => setTeamValue(e.target.value)}
                className='form-active'
              >
                <option>Välj team</option>
                {/* {teams &&
              teams.map((team: TeamResponseDto) => {
                return (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                );
              })} */}
              </Form.Select>
            </Form.Group>
            <Form.Group className='mb-3 col-3'>
              <Form.Select
                value={""}
                onChange={(e) => setPeriodValue(e.target.value)}
                className='form-active'
              >
                <option>Välj period</option>
                {/* {teams &&
              teams.map((team: TeamResponseDto) => {
                return (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                );
              })} */}
              </Form.Select>
            </Form.Group>
          </Form.Group>
          <div className='mb-3 col-3'>
            <Search
              value={searchValue}
              onChange={(value) => {
                setSearchValue(value);
                handleSearch(value);
              }}
              placeholder='kund'
            />
          </div>

          <div className='overflow-hidden'>
            <div className='row flex-nowrap overflow-auto' style={{ height: 750 }}>
              {filteredCustomers.map((customer) => (
                <CustomerProgressCard
                  customerchores={customerchores}
                  customer={customer}
                  key={customer.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Meeting;
