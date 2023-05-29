import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { CustomerChoreResponseDto, Periodic } from "../../../../api/client";
import { useClient } from "../../../../contexts/ClientContext";

interface Props {
  customerchore: CustomerChoreResponseDto;
  periodics: Periodic[];
}

const EditCustomerChoreRow = ({ customerchore, periodics }: Props) => {
  const queryClient = useQueryClient();
  const client = useClient();
  const [periodicsValue, setPeriodicsValue] = useState(customerchore.periodic?.name);
  const [disableRow, setDisableRow] = useState(true);
  const [frequencyValue, setFrequencyValue] = useState(customerchore.frequency);
  const [choreDescriptionValue, setChoreDescriptionValue] = useState(customerchore.description);
  const { mutate: updateCustomerChore, isLoading: updatingCustomerChore } = useMutation(
    async () => {
      return await client.customerChore_PutCustomerChore({
        id: customerchore.id,
        frequency: frequencyValue,
        periodicId: periodics.find((x) => x.name === periodicsValue)?.id,
        description: choreDescriptionValue,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["customerchores"]);
      },
    },
  );

  const {
    mutate: deleteCustomerChore,
    error: deleteCustomerChoreError,
    isLoading: deleteCustomerChoreIsLoading,
  } = useMutation(
    async () => await client.customerChore_DeleteCustomerChoreById(customerchore.id),

    {
      onSuccess: () => {
        queryClient.invalidateQueries(["customerchores"]);
        queryClient.invalidateQueries(["chorecomments"]);
        queryClient.invalidateQueries(["choreStatuses"]);
        queryClient.invalidateQueries(["customerChores", customerchore.customerId]);
        queryClient.invalidateQueries(["choresStatus", customerchore.id]);
        queryClient.invalidateQueries(["choreComment", customerchore.id]);
      },
    },
  );
  return (
    <tr>
      <td>
        <div className='form-control bg-transparent border-transparent ps-0'>
          {customerchore.chore?.title}
        </div>
      </td>
      <td>
        <Form.Control
          disabled={disableRow ? true : false}
          className={`${disableRow ? "border-transparent" : ""}`}
          type='text'
          value={frequencyValue.toString().replace(/^0+/, "").replace(/\D/g, "")}
          min={1}
          max={100}
          onKeyUp={() => {
            if (frequencyValue > 100) setFrequencyValue(100);
          }}
          onChange={(e) => setFrequencyValue(Number(e.target.value.replace(/\D/g, "")))}
        />
      </td>
      <td>
        <Form.Select
          disabled={disableRow ? true : false}
          className={`${disableRow ? "border-transparent" : ""}`}
          value={periodicsValue}
          onChange={(e) => setPeriodicsValue(e.target.value)}
        >
          <option value={customerchore.periodic?.id}>{customerchore.periodic?.name}</option>
          {periodics
            .filter((y) => y.id !== customerchore.periodic?.id)
            .map((periodic) => (
              <option
                key={periodic.id}
                value={periodic.id}
                onClick={() => setPeriodicsValue(periodic.id)}
              >
                {periodic.name}
              </option>
            ))}
        </Form.Select>
      </td>
      <td>
        {!disableRow ? (
          <Form.Group className='mb-3 mt-3'>
            <Form.Control
              as='textarea'
              rows={4}
              placeholder='Beskrivning på syssla'
              value={choreDescriptionValue}
              onChange={(e) => setChoreDescriptionValue(e.target.value)}
            />
          </Form.Group>
        ) : undefined}
      </td>
      <td>
        <div>
          {!disableRow ? (
            <Button
              className='me-2'
              size='sm'
              onClick={() => {
                setDisableRow(!disableRow);
                setFrequencyValue(customerchore.frequency);
                setPeriodicsValue(customerchore.periodic?.name);
                setChoreDescriptionValue(customerchore.description);
              }}
            >
              Avbryt
            </Button>
          ) : undefined}
          <Button
            size='sm'
            className='me-2'
            disabled={
              !disableRow &&
              customerchore.frequency === frequencyValue &&
              customerchore.periodic?.name === periodicsValue &&
              customerchore.description === choreDescriptionValue
                ? true
                : false
            }
            onClick={() => {
              setDisableRow(!disableRow);
              if (!disableRow) updateCustomerChore();
            }}
          >
            {disableRow ? "Redigera" : "Spara"}
          </Button>
          {!disableRow ? (
            <Button size='sm' variant='danger' onClick={() => deleteCustomerChore()}>
              Radera
            </Button>
          ) : undefined}
        </div>
      </td>
    </tr>
  );
};

export default EditCustomerChoreRow;
