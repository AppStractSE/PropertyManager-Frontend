import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const FilterOptions = (props: any) => {
  const [allCustomers, setAllCustomers] = useState(true);
  const [tempCustomers, setTempCustomers] = useState(true);
  const [ordinaryCustomers, setOrdinaryCustomers] = useState(true);

  useEffect(() => {
    if (tempCustomers && ordinaryCustomers) setAllCustomers(true);
    else if (!tempCustomers || !ordinaryCustomers) setAllCustomers(false);
  }, [tempCustomers, ordinaryCustomers]);

  return (
    <Modal
      {...props}
      fullscreen
      aria-labelledby='contained-modal-title-vcenter'
      centered
      className='filter'
    >
      <Modal.Header closeButton className='d-flex flex-row-reverse'>
        <Modal.Title>Kundfilter</Modal.Title>
      </Modal.Header>
      <Modal.Body className='p-2'>
        <div className='modal-body-section'>
          <Form>
            <Form.Text>Kunder</Form.Text>
            <Form.Group className='d-flex align-center-items filter-group'>
              <Form.Label>Visa alla</Form.Label>
              <Form.Check
                name='group1'
                type='switch'
                checked={allCustomers}
                onChange={(value) => {
                  setAllCustomers((prev) => !prev);
                  setOrdinaryCustomers(value.target.checked);
                  setTempCustomers(value.target.checked);
                }}
              />
            </Form.Group>
            <Form.Group className='d-flex align-center-items filter-group'>
              <Form.Label>Temporära (5st)</Form.Label>
              <Form.Check
                name='group1'
                type='checkbox'
                onChange={() => {
                  setTempCustomers((prev) => !prev);
                }}
                checked={tempCustomers}
              />
            </Form.Group>
            <Form.Group className='d-flex align-center-items filter-group'>
              <Form.Label>Fasta (10st)</Form.Label>
              <Form.Check
                name='group1'
                type='checkbox'
                onChange={() => {
                  setOrdinaryCustomers((prev) => !prev);
                }}
                checked={ordinaryCustomers}
              />
            </Form.Group>
          </Form>
        </div>
        <div className='modal-body-section'>
          <Form>
            <Form.Text>Status</Form.Text>
            <Form.Group className='d-flex align-center-items filter-group'>
              <Form.Label>Visa klara kunder (2st)</Form.Label>
              <Form.Check name='group1' type='switch' />
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Aktivera filter (2st resultat)</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterOptions;
