import { useState } from "react";
import { Button, Card, Dropdown, Form } from "react-bootstrap";
import { IoEllipsisVertical } from "react-icons/io5";
import LineChart from "../charts/LineChart";
import CustomerOverviewCard from "../overview/CustomerOverviewCard";
import {
  CustomerChoreResponseDto,
  CustomerResponseDto,
  Periodic,
  TeamResponseDto,
} from "../../../api/client";
import CustomerCard from "../../../components/CustomerCard";
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

          <div className='overflow-hidden'>
            <div className='row flex-nowrap overflow-auto' style={{ height: 750 }}>
              {customers.map((customer) => (
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
