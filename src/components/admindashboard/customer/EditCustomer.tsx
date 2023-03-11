import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import {
  Client,
  CustomerChoreResponseDto,
  CustomerResponseDto,
  Periodic,
  TeamMemberResponseDto,
  TeamResponseDto
} from "../../../api/client";

interface Props {
  customer: CustomerResponseDto;
  teams: TeamResponseDto[];
  teammembers: TeamMemberResponseDto[];
  onHide: () => void;
}

const EditCustomer = ({
  customer,
  teams,
  onHide
}: Props) => {
  const [team, setTeam] = useState(customer.teamId);
  const [customerName, setCustomerName] = useState(customer.name);
  const [customerAddress, setCustomerAddress] = useState(customer.address);
  const client = new Client();
  const queryClient = useQueryClient();
  const { mutate: updateCustomer, isLoading: updatingCustomer } = useMutation(
    async () => {
      return await client.customer_PutCustomer(customerObject);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("customers");
        queryClient.invalidateQueries(["teams"]);
      },
    },
  );

  const customerObject = {
    id: customer.id,
    name: customerName,
    address: customerAddress,
    teamId: team,
    areaId: customer.areaId,
  };
  return (
    <Form className='d-flex flex-column gap-4'>
      <Form.Group className='d-flex gap-4'>
        <Form.Group className='flex-grow-1'>
          <Form.Label>Kundnamn</Form.Label>
          <Form.Control
            autoFocus={true}
            type='text'
            onChange={(e) => setCustomerName(e.target.value)}
            value={customerName}
          />
        </Form.Group>
        <Form.Group className='flex-grow-1'>
          <Form.Label>Team</Form.Label>
          <Form.Select value={team} className='rounded-0' onChange={(e) => setTeam(e.target.value)}>
            {teams?.map((team) => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form.Group>
      <Form.Group>
        <Form.Label>Adress</Form.Label>
        <Form.Control
          autoFocus={true}
          type='text'
          onChange={(e) => setCustomerAddress(e.target.value)}
          value={customerAddress}
        />
      </Form.Group>

      <div className='d-flex gap-4'>
        <Button className='w-50' onClick={() => onHide()}>
          Avbryt
        </Button>
        <Button
          className='w-50'
          onClick={() => updateCustomer()}
          disabled={
            updatingCustomer ||
            (customerName === customer.name &&
              customerAddress === customer.address &&
              team === customer.teamId)
          }
        >
          {updatingCustomer && (
            <Spinner
              className='mx-2'
              size='sm'
              as='span'
              animation='border'
              role='status'
              aria-hidden='true'
            />
          )}
          {updatingCustomer ? "Sparar..." : "Spara"}
        </Button>
      </div>
    </Form>
  );
};

export default EditCustomer;
