import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  ChoreResponseDto,
  CustomerChoreResponseDto,
  CustomerResponseDto,
  Periodic,
} from "../../../../api/client";
import { useClient } from "../../../../contexts/ClientContext";
import toasts from "../../../../data/toasts";

interface Props {
  customers?: CustomerResponseDto[];
  customer?: CustomerResponseDto;
  periodics: Periodic[];
  chores: ChoreResponseDto[];
  customerchores: CustomerChoreResponseDto[];
}

const AddCustomerChore = ({ customers, customer, customerchores, periodics, chores }: Props) => {
  const [choreValue, setChoreValue] = useState("");
  const [customerValue, setCustomerValue] = useState("");
  const [periodicValue, setPeriodicValue] = useState("");
  const [frequencyValue, setFrequencyValue] = useState(1);
  const queryClient = useQueryClient();
  const client = useClient();
  const { mutate: postCustomerChore, isLoading: postingCustomerChore } = useMutation(
    async () => {
      return await client.customerChore_PostCustomerChore({
        customerId: customer ? customer.id : customerValue,
        choreId: choreValue,
        frequency: frequencyValue,
        periodicId: periodicValue,
      });
    },
    {
      onSuccess: () => {
        setFrequencyValue(0);
        setChoreValue("");
        setChoreValue("");
        setPeriodicValue("");
        queryClient.invalidateQueries("customers");
        queryClient.invalidateQueries("periodics");
        queryClient.invalidateQueries("chores");
        queryClient.invalidateQueries("customerchores");
        toast.success(toasts.create.customerchore.onMutate.message);
      },
    },
  );
  return (
    <Form className='d-flex flex-column gap-3'>
      {customers ? (
        <Form.Group>
          <Form.Label>Kund</Form.Label>
          <Form.Select
            aria-label='Välj kund dropdown'
            value={customerValue}
            onChange={(e) => {
              setCustomerValue(e.target.value);
              setChoreValue("");
            }}
            className='form-active'
          >
            <option value=''>Välj kund</option>
            {customers?.map((customer) => {
              return (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
      ) : null}

      <Form.Group>
        <Form.Label>Syssla</Form.Label>
        <Form.Select
          disabled={customerValue === "" ? true : false}
          aria-label='Chore'
          value={choreValue}
          onChange={(e) => setChoreValue(e.target.value)}
          className='form-active'
        >
          <option value=''>Välj syssla</option>
          {chores.map((chore) => {
            return (
              <option
                key={chore.id}
                value={chore.id}
                disabled={
                  customerchores
                    ?.filter((x) => x.customerId === customerValue)
                    .find((x) => x.chore?.id === chore.id)
                    ? true
                    : false
                }
              >
                {chore.title}
              </option>
            );
          })}
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>Hur ofta ska sysslan utföras?</Form.Label>
        <Form.Control
          type='number'
          value={frequencyValue.toString().replace(/^0+/, "Skriv in ett tal")}
          min={1}
          max={100}
          placeholder='Skriv in ett tal'
          onKeyUp={() => {
            if (frequencyValue > 100) setFrequencyValue(100);
          }}
          onChange={(e) => setFrequencyValue(Number(e.target.value))}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Återkommande</Form.Label>
        <Form.Select
          aria-label='Tidsintervall'
          value={periodicValue}
          onChange={(e) => setPeriodicValue(e.target.value)}
          className='form-active'
        >
          <option value=''>Välj tidsintervall</option>
          {periodics.map((periodic) => {
            return (
              <option key={periodic.id} value={periodic.id}>
                {periodic.name}
              </option>
            );
          })}
        </Form.Select>
      </Form.Group>

      <Button
        className='w-100'
        onClick={() => postCustomerChore()}
        disabled={
          !choreValue
            ? true
            : false || !periodicValue
            ? true
            : false || !customerValue
            ? true
            : false || frequencyValue === 0
        }
      >
        Lägg till syssla på kund
      </Button>
    </Form>
  );
};

export default AddCustomerChore;
