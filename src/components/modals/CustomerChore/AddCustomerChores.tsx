import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import axiosClient from "../../../utils/axiosClient";

const AddCustomerModal = (props: any) => {
  const [choreValue, setChoreValue] = useState("");
  const [customerValue, setCustomerValue] = useState("");
  const [periodicValue, setPeriodicValue] = useState("");
  const [frequencyValue, setFrequencyValue] = useState("");
  // Get;a en customerById
  const { mutate: postCustomerChore, isLoading: postingCustomerChore } = useMutation(
    async () => {
      return await axiosClient.post("/CustomerChore", {
        customerId: customerValue,
        choreId: choreValue,
        frequency: frequencyValue,
        periodicId: periodicValue,
      });
    },
    {
      onSuccess: () => {
        setFrequencyValue("");
        console.log("success");
        props.onHide();
      },
    },
  );

  // const { data: customerChore } = useQuery<PostCustomerChoreRequestDto>;
  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Lägg till syssla</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='formAddArea'>
            <Form.Label>Hur ofta ska sysslan utföras?</Form.Label>
            <Form.Control
              type='number'
              // placeholder=''
              value={frequencyValue}
              onChange={(e) => setFrequencyValue(e.target.value)}
            />
          </Form.Group>
          <Button
            className='w-100'
            onClick={() => postCustomerChore()}
            disabled={frequencyValue.length < 3 ? true : false}
          >
            Lägg till område
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCustomerModal;
