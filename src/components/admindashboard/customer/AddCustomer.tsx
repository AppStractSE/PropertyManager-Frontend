import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { AreaResponseDto, Client, TeamResponseDto } from "../../../api/client";

interface Props {
  teams: TeamResponseDto[];
  areas: AreaResponseDto[];
}

const AddCustomer = ({ teams, areas }: Props) => {
  const [teamValue, setTeamValue] = useState("");
  const [areaValue, setAreaValue] = useState("");
  const [customerValue, setCustomerValue] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const client = new Client();
  const queryClient = useQueryClient();
  const { mutate: postCustomer, isLoading: postingCustomer } = useMutation(
    async () => {
      return await client.customer_PostCustomer({
        name: customerValue,
        teamId: teamValue,
        areaId: areaValue,
        address: addressValue,
      });
    },
    {
      onSuccess: () => {
        setCustomerValue("");
        setTeamValue("");
        setAreaValue("");
        setAddressValue("");
        queryClient.invalidateQueries("customers");
        console.log("Customer posted");
      },
    },
  );
  return (
    <Form>
      <Form.Group className='row'>
        <Form.Group className='mb-3 col-6'>
          <Form.Label>Namn</Form.Label>
          <Form.Control
            type='text'
            placeholder='Skriv in kundnamn'
            value={customerValue}
            onChange={(e) => setCustomerValue(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3 col-6'>
          <Form.Label>Team</Form.Label>
          <Form.Select
            value={teamValue}
            onChange={(e) => setTeamValue(e.target.value)}
            className='form-active'
          >
            <option>Välj team</option>
            {teams &&
              teams.map((team: TeamResponseDto) => {
                return (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                );
              })}
          </Form.Select>
        </Form.Group>
      </Form.Group>
      <Form.Group className='row'>
        <Form.Group className='mb-3 col-6'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Skriv in kundaddress'
            value={addressValue}
            onChange={(e) => setAddressValue(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3 col-6'>
          <Form.Label>Område</Form.Label>
          <Form.Select
            value={areaValue}
            onChange={(e) => setAreaValue(e.target.value)}
            className='form-active'
          >
            <option>Välj område</option>
            {areas &&
              areas.map((area: AreaResponseDto) => {
                return (
                  <option key={area.id} value={area.id}>
                    {area.name}
                  </option>
                );
              })}
          </Form.Select>
        </Form.Group>
      </Form.Group>

      <Button
        className='w-100'
        onClick={() => postCustomer()}
        disabled={
          customerValue.length < 3
            ? true
            : false || teamValue.includes("Välj")
            ? true
            : false || areaValue.includes("Välj")
            ? true
            : false || addressValue.length < 3
            ? true
            : false
        }
      >
        {postingCustomer ? (
          <Spinner
            as='span'
            animation='border'
            size='sm'
            role='status'
            aria-hidden='true'
            className='mx-2'
          />
        ) : null}
        {postingCustomer ? "Lägger till ny kund..." : "Lägg till kund"}
      </Button>
    </Form>
  );
};

export default AddCustomer;
