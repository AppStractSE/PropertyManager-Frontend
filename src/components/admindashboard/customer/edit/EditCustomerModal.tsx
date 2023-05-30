import React from "react";
import { useState } from "react";
import { Modal, Nav, Tab } from "react-bootstrap";
import {
  ChoreResponseDto,
  CustomerChoreResponseDto,
  CustomerResponseDto,
  Periodic,
  TeamMemberResponseDto,
  TeamResponseDto,
} from "../../../../api/client";
import Search from "../../../Search";
import DeleteCustomer from "../delete/DeleteCustomer";
import EditCustomerChoreTable from "../table/EditCustomerChoreTable";
import EditCustomer from "./EditCustomer";

interface Props {
  chores: ChoreResponseDto[];
  customer: CustomerResponseDto;
  customerchores: CustomerChoreResponseDto[];
  onHide: () => void;
  periodics: Periodic[];
  show: boolean;
  teams: TeamResponseDto[];
  teammembers: TeamMemberResponseDto[];
}

const EditCustomerModal = ({
  chores,
  customer,
  customerchores,
  onHide,
  periodics,
  show,
  teams,
  teammembers,
}: Props) => {
  const [search, setSearch] = useState("");
  return (
    <Modal show={show} id='editCustomer' size='lg' onHide={() => onHide()}>
      <Modal.Header closeButton onHide={() => onHide()}>
        <Modal.Title>{customer.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='m-3'>
        <Tab.Container defaultActiveKey='first'>
          <Nav variant='pills' className='gap-2 flex-row mb-4 align-items-center'>
            <Nav.Item>
              <Nav.Link eventKey='first'>Kunduppgifter</Nav.Link>
            </Nav.Item>
            {customerchores.filter((customerchore) => customerchore.customerId === customer.id)
              .length > 0 ? (
              <Nav.Item>
                <Nav.Link eventKey='second'>Kundsysslor</Nav.Link>
              </Nav.Item>
            ) : undefined}
            <DeleteCustomer customer={customer} />
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey='first'>
              <EditCustomer
                customer={customer}
                teams={teams}
                teammembers={teammembers}
                onHide={onHide}
              />
            </Tab.Pane>
            {customerchores.filter((customerchore) => customerchore.customerId === customer.id)
              .length > 0 ? (
              <Tab.Pane eventKey='second'>
                <Search
                  value={search}
                  onChange={(value) => setSearch(value)}
                  placeholder='kundsysslor'
                />
                <EditCustomerChoreTable
                  search={search}
                  customer={customer}
                  customerchores={customerchores}
                  periodics={periodics}
                />
              </Tab.Pane>
            ) : undefined}
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
    </Modal>
  );
};

export default EditCustomerModal;
