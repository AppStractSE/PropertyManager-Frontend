import { Modal, Nav, Tab } from "react-bootstrap";
import {
  CustomerChoreResponseDto,
  CustomerResponseDto,
  Periodic,
  TeamMemberResponseDto,
  TeamResponseDto,
} from "../../../api/client";
import EditCustomerChores from "../customer/edit/EditCustomerChoreTable";
import EditCustomer from "../customer/EditCustomer";

interface Props {
  show: boolean;
  onHide: () => void;
  customer: CustomerResponseDto;
  teams: TeamResponseDto[];
  teammembers: TeamMemberResponseDto[];
  customerchores: CustomerChoreResponseDto[];
  periodics: Periodic[];
}

const EditCustomerModal = ({
  customer,
  teams,
  teammembers,
  customerchores,
  periodics,
  show,
  onHide,
}: Props) => {
  return (
    <Modal show={show} id='editCustomer' size='lg' onEscapeKeyDown={() => onHide()}>
      <Modal.Header closeButton onHide={() => onHide()}>
        <Modal.Title id='contained-modal-title-vcenter'>{customer.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='px-3 py-2 mb-2'>
        <Tab.Container defaultActiveKey='first'>
          <Nav variant='pills' className='flex-row mb-4'>
            <Nav.Item>
              <Nav.Link eventKey='first'>Kunduppgifter</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='second'>Kundsysslor</Nav.Link>
            </Nav.Item>
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
            <Tab.Pane eventKey='second'>
              <EditCustomerChores
                customer={customer}
                customerchores={customerchores}
                periodics={periodics}
              />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
    </Modal>
  );
};

export default EditCustomerModal;
