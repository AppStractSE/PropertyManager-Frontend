import { useState } from "react";
import { Form } from "react-bootstrap";
import { CustomerChoreResponseDto, Periodic } from "../../../../api/client";

interface Props {
  customerchore: CustomerChoreResponseDto;
  periodics: Periodic[];
}

const PeriodicsEdit = ({ customerchore, periodics }: Props) => {
  const [periodicsValue, setPeriodicsValue] = useState(customerchore.periodic?.name);
  return (
    <Form.Select value={periodicsValue} onChange={(e) => setPeriodicsValue(e.target.value)}>
      <option className='pb-2' value={customerchore.periodic?.id}>
        {customerchore.periodic?.name}
      </option>
      {periodics
        .filter((y) => y.id !== customerchore.periodic?.id)
        .map((periodic) => (
          <option value={periodic.id}>{periodic.name}</option>
        ))}
    </Form.Select>
  );
};

export default PeriodicsEdit;
