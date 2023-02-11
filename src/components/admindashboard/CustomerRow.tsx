import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CustomerResponseDto, TeamMemberResponseDto, TeamResponseDto } from "../../api/client";

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
          className={`w-auto rounded-0 ${rowIsDisabled ? "" : "border"}`}
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
          className={`w-auto rounded-0 ${rowIsDisabled ? "" : "border"}`}
        />
      </td>
      <td>
        {rowIsDisabled ? (
          <div className='w-auto rounded-0 form-control' style={{ borderColor: "transparent" }}>
            {teams?.find((x) => x.id === team)?.name}
          </div>
        ) : (
          <Form.Select value={team} className='w-auto rounded-0'>
            {teams?.map((team) => (
              <option onClick={() => setTeam(team.id)} value={team.id}>
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
          onClick={() => setRowIsDisabled(!rowIsDisabled)}
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
