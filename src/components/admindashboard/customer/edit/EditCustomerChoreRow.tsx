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
  const { mutate: updateCustomerChore, isLoading: updatingCustomerChore } = useMutation(
    async () => {
      return await client.customerChore_PutCustomerChore({
        id: customerchore.id,
        frequency: frequencyValue,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("customers");
        queryClient.invalidateQueries(["teams"]);
        queryClient.invalidateQueries(["teammembers"]);
        queryClient.invalidateQueries(["customerchores"]);
      },
    },
  );
  return (
    <tr>
      <td>
        <div className='form-control border-transparent ps-0'>{customerchore.chore?.title}</div>
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
              <option key={periodic.id} value={periodic.id} onClick={() => setPeriodicsValue(periodic.id)}>
                {periodic.name}
              </option>
            ))}
        </Form.Select>
      </td>
      <td>
        {!disableRow ? (
          <Button
            className='me-2'
            onClick={() => {
              setDisableRow(!disableRow);
              setFrequencyValue(customerchore.frequency);
              setPeriodicsValue(customerchore.periodic?.name);
            }}
          >
            Avbryt
          </Button>
        ) : null}
        <Button
          disabled={
            !disableRow && customerchore.frequency === frequencyValue && customerchore.periodic?.name === periodicsValue 
              ? true
              : false
          }
          onClick={() => setDisableRow(!disableRow)}
        >
          {disableRow ? "Redigera" : "Spara"}
        </Button>
      </td>
    </tr>
  );
};

export default EditCustomerChoreRow;
