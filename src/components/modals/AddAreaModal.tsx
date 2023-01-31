import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import axiosClient from "../../utils/axiosClient";

const AddAreaModal = (props: any) => {
  const [areaValue, setAreaValue] = useState("");
  const queryClient = useQueryClient();
  const { mutate: postArea, isLoading: postingArea } = useMutation(
    async () => {
      return await axiosClient.post("/Area", {
        name: areaValue,
      });
    },
    {
      onSuccess: () => {
        setAreaValue("");
        queryClient.invalidateQueries("areas");
        console.log("success");
        props.onHide();
      },
    },
  );

  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Lägg till område</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
    </Modal>
  );
};

export default AddAreaModal;
