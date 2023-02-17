import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import {
  Client,
  CustomerResponseDto,
  TeamMemberResponseDto,
  TeamResponseDto,
} from "../../api/client";

interface Props {
  customer: CustomerResponseDto;
  teams: TeamResponseDto[];
  teammembers: TeamMemberResponseDto[];
}

const CustomerRow = ({ teams, customer, teammembers }: Props) => {
  const [rowIsDisabled, setRowIsDisabled] = useState(true);
  const [team, setTeam] = useState(customer.teamId);
  const [customerName, setCustomerName] = useState(customer.name);
  const [customerAddress, setCustomerAddress] = useState(customer.address);
  const client = new Client();
  const queryClient = useQueryClient();
  const customerObject = {
    id: customer.id,
    name: customerName,
    address: customerAddress,
    teamId: team,
    areaId: customer.areaId,
  };
  const { mutate: updateCustomer, isLoading: updatingCustomer } = useMutation(
    async () => {
      return await client.customer_PutCustomer(customerObject);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("customers");
      },
    },
  );

  return (
    <>
      <td>
        <Form.Control
          autoFocus={true}
          disabled={rowIsDisabled ? true : false}
          type='text'
          onChange={(e) => setCustomerName(e.target.value)}
          value={customerName}
          style={{ borderColor: "transparent" }}
          className={`rounded-0 ${rowIsDisabled ? "" : "border"}`}
        />
      </td>
      <td>
        <Form.Control
          autoFocus={true}
          disabled={rowIsDisabled ? true : false}
          type='text'
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
          style={{ borderColor: "transparent" }}
          className={`rounded-0 ${rowIsDisabled ? "" : "border"}`}
        />
      </td>
      <td>
        {rowIsDisabled ? (
          <div className='rounded-0 form-control' style={{ borderColor: "transparent" }}>
            {teams?.find((x) => x.id === team)?.name}
          </div>
        ) : (
          <Form.Select value={team} className='rounded-0' onChange={(e) => setTeam(e.target.value)}>
            {teams?.map((team) => (
              <option value={team.id}>
                {team.name}
                <div className='d-flex flex-column gap-4'>
                  <div> - Alex</div>
                  <div> - Konny</div>
                </div>
              </option>
            ))}
          </Form.Select>
        )}
      </td>
      <td>
        <Button
          className='me-2'
          variant='outline-primary'
          size='sm'
          onClick={() => {
            if (!rowIsDisabled) updateCustomer();
            setRowIsDisabled(!rowIsDisabled);
          }}
        >
          {rowIsDisabled ? "Redigera" : "Spara"}
        </Button>
        {!rowIsDisabled && (
          <Button
            variant='outline-primary'
            size='sm'
            onClick={() => console.log("Delete customer")}
          >
            Radera
          </Button>
        )}
      </td>
    </>
  );
};

export default CustomerRow;
