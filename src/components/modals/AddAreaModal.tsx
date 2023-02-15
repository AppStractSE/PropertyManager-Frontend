import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { Client } from "../../api/client";

const AddArea = () => {
  const [areaValue, setAreaValue] = useState("");
  const queryClient = useQueryClient();
  const client = new Client();
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
      },
    },
  );

  return (
        <Form>
          <Form.Group className='mb-3' controlId='formAddArea'>
            <Form.Label>Area</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter area name'
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
