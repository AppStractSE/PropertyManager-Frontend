import { Modal, Nav, Tab } from "react-bootstrap";
import {
  CategoryResponseDto,
  ChoreResponseDto,
  CustomerResponseDto,
  Periodic,
} from "../../../../api/client";
import AddCustomerChore from "../../customer/add/AddCustomerChore";
import AddChore from "./AddChore";

interface Props {
  customers: CustomerResponseDto[];
  chores: ChoreResponseDto[];
  periodics: Periodic[];
  categories: CategoryResponseDto[];
  show: boolean;
  onHide: () => void;
}

const AddChoreModal = ({ customers, chores, periodics, categories, show, onHide }: Props) => {
  return (
    <Modal show={show} onHide={() => onHide()}>
      <Modal.Header closeButton>
        <Modal.Title>Skapa ny syssla</Modal.Title>
      </Modal.Header>
      <Modal.Body className='m-3'>
        <Tab.Container defaultActiveKey='first'>
          <Nav
            variant='pills'
            className='flex-row justify-content-center gap-5 mt-3 mb-5 default-cursor'
          >
            <Nav.Item>
              <Nav.Link eventKey='first'>Kundsyssla</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='second'>Grundsyssla</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey='first'>
              <AddCustomerChore customers={customers} periodics={periodics} chores={chores} />
            </Tab.Pane>
            <Tab.Pane eventKey='second'>
              <AddChore categories={categories} />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
    </Modal>
  );
};

export default AddChoreModal;
