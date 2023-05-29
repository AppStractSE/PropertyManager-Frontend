import React from "react";
import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { AreaResponseDto, CityResponseDto, TeamResponseDto } from "../../../../api/client";
import { useClient } from "../../../../contexts/ClientContext";
import toasts from "../../../../data/toasts";

interface Props {
  teams: TeamResponseDto[];
  areas: AreaResponseDto[];
  cities: CityResponseDto[];
  close?: () => void;
}

const AddCustomer = ({ teams, areas, close, cities }: Props) => {
  const [teamValue, setTeamValue] = useState("");
  const [areaValue, setAreaValue] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [customerValue, setCustomerValue] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const client = useClient();
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
        toast.success(toasts.create.customer.onMutate.message);
        queryClient.invalidateQueries("customers");
        if (close) close();
      },
    },
  );
  return (
    <Form>
      <Form.Group className='mb-3'>
        <Form.Label>Namn</Form.Label>
        <Form.Control
          type='text'
          placeholder='Skriv in kundnamn'
          value={customerValue}
          onChange={(e) => setCustomerValue(e.target.value)}
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Adress</Form.Label>
        <Form.Control
          type='text'
          placeholder='Skriv in kundadress'
          value={addressValue}
          onChange={(e) => setAddressValue(e.target.value)}
        />
      </Form.Group>
      <Form.Group className='row'>
        <Form.Group className='mb-3 col-12'>
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
        <Form.Group className='mb-3 col-6'>
          <Form.Label>Ort</Form.Label>
          <Form.Select
            value={cityValue}
            onChange={(e) => setCityValue(e.target.value)}
            className='form-active'
          >
            <option>Välj ort</option>
            {cities &&
              cities.map((city: CityResponseDto) => {
                return (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                );
              })}
          </Form.Select>
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
              areas
                .filter((x) => x.cityId === cityValue)
                .map((area: AreaResponseDto) => {
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
