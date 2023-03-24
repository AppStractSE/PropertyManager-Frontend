import { useState } from "react";
import { Form } from "react-bootstrap";
import { CustomerChoreResponseDto } from "../../../../api/client";

interface Props {
  customerchore: CustomerChoreResponseDto;
}

const FrequencyEdit = ({ customerchore }: Props) => {
  const [frequencyValue, setFrequencyValue] = useState(customerchore.frequency);
  return (
    <Form.Group>
      <Form.Label>Hur ofta ska sysslan utföras?</Form.Label>
      <Form.Control
        type='number'
        value={frequencyValue.toString().replace(/^0+/, "")}
        min={1}
        max={100}
        onKeyUp={() => {
          if (frequencyValue > 100) setFrequencyValue(100);
        }}
        onChange={(e) => setFrequencyValue(Number(e.target.value))}
      />
    </Form.Group>
  );
};

export default FrequencyEdit;
