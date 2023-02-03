import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import axiosClient from "../../../utils/axiosClient";

const AddCustomerChoreModal = (props: any) => {
  const [choreValue, setChoreValue] = useState("");
  const [customerValue, setCustomerValue] = useState("");
  const [periodicValue, setPeriodicValue] = useState("");
  const [frequencyValue, setFrequencyValue] = useState("");
  const queryClient = useQueryClient();
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
        queryClient.invalidateQueries("customers");
        queryClient.invalidateQueries("periodics");
        queryClient.invalidateQueries("chores");
        console.log("success");
        props.onHide();
      },
    },
  );
  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Lägg till syssla</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3 d-flex flex-column gap-3' controlId='formAddArea'>
            <Form.Label>Hur ofta ska sysslan utföras?</Form.Label>
            <Form.Control
              type='number'
              value={frequencyValue}
              onChange={(e) => setFrequencyValue(e.target.value)}
            />
            <Form.Select
              aria-label='Chore'
              value={choreValue}
              onChange={(e) => setChoreValue(e.target.value)}
              className='form-active'
            >
              <option>Välj syssla</option>
              {props.chores &&
                props.chores.map((chore: any) => {
                  return (
                    <option key={chore.id} value={chore.id}>
                      {chore.title}
                    </option>
                  );
                })}
            </Form.Select>
            <Form.Select
              aria-label='Tidsintervall'
              value={periodicValue}
              onChange={(e) => setPeriodicValue(e.target.value)}
              className='form-active'
            >
              <option>Välj tidsintervall</option>
              {props.periodics &&
                props.periodics.map((periodic: any) => {
                  return (
                    <option key={periodic.id} value={periodic.id}>
                      {periodic.name}
                    </option>
                  );
                })}
            </Form.Select>
            <Form.Select
              aria-label='Välj kund dropdown'
              value={customerValue}
              onChange={(e) => setCustomerValue(e.target.value)}
              className='form-active'
            >
              <option>Välj kund</option>
              {props.customers &&
                props.customers.map((customer: any) => {
                  return (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  );
                })}
            </Form.Select>
          </Form.Group>
          <Button
            className='w-100'
            onClick={() => postCustomerChore()}
            disabled={
              choreValue.includes("Välj")
                ? true
                : false || periodicValue.includes("Välj")
                ? true
                : false || customerValue.includes("Välj")
                ? true
                : false || frequencyValue == null
            }
          >
            Lägg till syssla på kund
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCustomerChoreModal;