import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { Client } from "../../api/client";

const AddCustomerChore = (props: any) => {
  const [choreValue, setChoreValue] = useState("");
  const [customerValue, setCustomerValue] = useState("");
  const [periodicValue, setPeriodicValue] = useState("");
  const [frequencyValue, setFrequencyValue] = useState(1);
  const queryClient = useQueryClient();
  const client = new Client();
  const { mutate: postCustomerChore, isLoading: postingCustomerChore } = useMutation(
    async () => {
      return await client.customerChore_PostCustomerChore({
        customerId: customerValue,
        choreId: choreValue,
        frequency: frequencyValue,
        periodicId: periodicValue,
      });
    },
    {
      onSuccess: () => {
        setFrequencyValue(0);
        queryClient.invalidateQueries("customers");
        queryClient.invalidateQueries("periodics");
        queryClient.invalidateQueries("chores");
        console.log("success");
      },
    },
  );
  return (
    <Form className='mb-3 d-flex flex-column gap-3'>
      <Form.Group>
        <Form.Label>Hur ofta ska sysslan utföras?</Form.Label>
        <Form.Control
          type='number'
          value={frequencyValue.toString().replace(/^0+/, "Skriv in ett tal")}
          min={1}
          max={100}
          onKeyUp={() => {
            if (frequencyValue > 100) setFrequencyValue(100);
          }}
          onChange={(e) => setFrequencyValue(Number(e.target.value))}
        />
      </Form.Group>
      <Form.Group>
        <Form.Select
          aria-label='Chore'
          value={choreValue}
          onChange={(e) => setChoreValue(e.target.value)}
          className='form-active'
        >
          <option>Välj syssla</option>
          {props.chores &&
            props.chores.map((chore: any) => {
              return (
                <option key={chore.id} value={chore.id}>
                  {chore.title}
                </option>
              );
            })}
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Select
          aria-label='Tidsintervall'
          value={periodicValue}
          onChange={(e) => setPeriodicValue(e.target.value)}
          className='form-active'
        >
          <option>Välj tidsintervall</option>
          {props.periodics &&
            props.periodics.map((periodic: any) => {
              return (
                <option key={periodic.id} value={periodic.id}>
                  {periodic.name}
                </option>
              );
            })}
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Select
          aria-label='Välj kund dropdown'
          value={customerValue}
          onChange={(e) => setCustomerValue(e.target.value)}
          className='form-active'
        >
          <option>Välj kund</option>
          {props.customers &&
            props.customers.map((customer: any) => {
              return (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              );
            })}
        </Form.Select>
      </Form.Group>
      <Button
        className='w-100'
        onClick={() => postCustomerChore()}
        disabled={
          choreValue.includes("Välj")
            ? true
            : false || periodicValue.includes("Välj")
            ? true
            : false || customerValue.includes("Välj")
            ? true
            : false || frequencyValue == 0
        }
      >
        Lägg till syssla på kund
      </Button>
    </Form>
  );
};

export default AddCustomerChore;
