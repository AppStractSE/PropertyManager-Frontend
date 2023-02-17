import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Client, CustomerChoreResponseDto, Periodic } from "../../../../api/client";

interface Props {
  customerchore: CustomerChoreResponseDto;
  periodics: Periodic[];
}

const EditCustomerChoreRow = ({ customerchore, periodics }: Props) => {
  const queryClient = useQueryClient();
  const client = new Client();
  const [periodicsValue, setPeriodicsValue] = useState(customerchore.periodic?.name);
  const [frequency, setFrequency] = useState(customerchore.frequency);
  const { mutate: updateCustomerChore, isLoading: updatingCustomerChore } = useMutation(
    async () => {
      return await client.customerChore_PutCustomerChore({
        id: customerchore.id,
        frequency: frequency,
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
      <td>{customerchore.chore?.title}</td>
      <td>{customerchore.frequency}</td>
      <td>{customerchore.periodic?.name}</td>
    </tr>
  );
};

export default EditCustomerChoreRow;
