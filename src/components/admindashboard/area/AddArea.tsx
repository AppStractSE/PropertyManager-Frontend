import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { useClient } from "../../../contexts/ClientContext";

interface Props {
  close?: () => void;
}

const AddArea = ({ close }: Props) => {
  const [areaValue, setAreaValue] = useState("");
  const queryClient = useQueryClient();
  const client = useClient();
  const { mutate: postArea, isLoading: postingArea } = useMutation(
    // TODO: isLoading används aldrig, åtgärda?
    async () => {
      return await client.area_PostArea({
        name: areaValue,
      });
    },
    {
      onSuccess: () => {
        setAreaValue("");
        queryClient.invalidateQueries("areas");
        if (close) close();
      },
    },
  );

  return (
    <Form>
      <Form.Group className='mb-3' controlId='formAddArea'>
        <Form.Label>Namn</Form.Label>
        <Form.Control
          type='text'
          placeholder='Skriv in områdesnamn'
          value={areaValue}
          onChange={(e) => setAreaValue(e.target.value)}
        />
      </Form.Group>
      <Button
        className='w-100'
        onClick={() => postArea()}
        disabled={areaValue.length < 3 ? true : false}
      >
        Lägg till område
      </Button>
    </Form>
  );
};

export default AddArea;
