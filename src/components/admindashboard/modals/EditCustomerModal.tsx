import { Button, Modal, Nav, Tab } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import { useMutation, useQueryClient } from "react-query";
import {
  ChoreResponseDto,
  CustomerChoreResponseDto,
  CustomerResponseDto,
  Periodic,
  TeamMemberResponseDto,
  TeamResponseDto,
} from "../../../api/client";
import { useClient } from "../../../contexts/ClientContext";
import AddCustomerChore from "../AddCustomerChore";
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
  chores: ChoreResponseDto[];
}

const EditCustomerModal = ({
  customer,
  teams,
  teammembers,
  customerchores,
  periodics,
  show,
  onHide,
  chores,
}: Props) => {
  const client = useClient();
  const queryClient = useQueryClient();
  const {
    mutate: deleteCustomer,
    error: deleteCustomerError,
    isLoading: deleteCustomerIsLoading,
  } = useMutation(
    async () => await client.customer_DeleteCustomerById(customer.id),

    {
      onSuccess: () => {
        queryClient.invalidateQueries("customers");
        queryClient.invalidateQueries("customerchores");
        queryClient.invalidateQueries("choreStatuses");
        queryClient.invalidateQueries("chorecomments");
      },
    },
  );

  return (
    <Modal show={show} id='editCustomer' size='lg' onEscapeKeyDown={() => onHide()}>
      <Modal.Header closeButton onHide={() => onHide()}>
        <Modal.Title id='contained-modal-title-vcenter'>{customer.name}</Modal.Title>
        <Button onClick={() => deleteCustomer()}>
          <BsFillTrashFill className='ms-4' size={24} color={"red"} />
        </Button>
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
            <Nav.Item>
              <Nav.Link eventKey='third'>Skapa kundsyssla</Nav.Link>
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

            <Tab.Pane eventKey='third'>
              <AddCustomerChore periodics={periodics} customer={customer} chores={chores} />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
    </Modal>
  );
};

export default EditCustomerModal;
