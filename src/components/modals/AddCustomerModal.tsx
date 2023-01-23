import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import axiosClient from "../../utils/axiosClient";

const AddCustomerModal = (props: any) => {
  const [teamValue, setTeamValue] = useState("");
  const [areaValue, setAreaValue] = useState("");
  const [customerValue, setCustomerValue] = useState("");
  const { mutate: postCustomer, isLoading: postingCustomer } = useMutation(
    async () => {
      return await axiosClient.post("/Customer", {
        name: customerValue,
        teamId: teamValue,
        areaId: areaValue,
        address: "Testgatan 27B, Skövde",
      });
    },
    {
      onSuccess: () => {
        setCustomerValue("");
        console.log("success");
        props.onHide();
      },
    },
  );
  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Lägg till kund</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3 d-flex flex-column gap-3' controlId='formAddArea'>
            <Form.Label>Customer</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter customer name'
              value={customerValue}
              onChange={(e) => setCustomerValue(e.target.value)}
            />
            <Form.Select aria-label='Välj team dropdown' value={teamValue} onChange={(e) => setTeamValue(e.target.value)} className="form-active">
              <option>Välj team</option>
              {props.teams &&
                props.teams.map((team: any) => {
                  return (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  );
                })}
            </Form.Select>
            <Form.Select aria-label='Välj område dropdown' value={areaValue} onChange={(e) => setAreaValue(e.target.value)}  className="form-active">
              <option>Välj område</option>
              {props.areas &&
                props.areas.map((area: any) => {
                  return (
                    <option key={area.id} value={area.id}>
                      {area.name}
                    </option>
                  );
                })}
            </Form.Select>
          </Form.Group>
          <Button
            className='w-100'
            onClick={() => postCustomer()}
            disabled={customerValue.length < 3 ? true : false || teamValue.includes("Välj") ? true : false || areaValue.includes("Välj") ? true : false}
          >
            Lägg till kund
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCustomerModal;
