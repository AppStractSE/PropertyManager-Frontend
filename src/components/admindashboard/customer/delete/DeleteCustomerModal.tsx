import React from "react";
import { Button, Modal } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import { useMutation, useQueryClient } from "react-query";
import { CustomerResponseDto } from "../../../../api/client";
import { useClient } from "../../../../contexts/ClientContext";

interface Props {
  customer: CustomerResponseDto;
  show: boolean;
  onHide: () => void;
}

const DeleteCustomerModal = ({ customer, show, onHide }: Props) => {
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
    <Modal
      centered
      backdropClassName='nested-modal-backdrop'
      className='nested-modal'
      show={show}
      onHide={() => onHide()}
    >
      <Modal.Header closeButton onHide={() => onHide()}>
        <Modal.Title>Radera kund</Modal.Title>
      </Modal.Header>
      <Modal.Body className='px-3 py-2 mb-2'>
        <div className='fs-6'>
          Är du säker på att du vill radera kunden <span className='fw-bold'>{customer.name}</span>?
        </div>
        <div className='mb-2 mt-0 form-text'>
          Notera: Allt relaterat till kunden kommer att raderas och kan inte ångras.
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className='d-flex flex-fill gap-3'>
          <Button className='text-center' onClick={() => onHide()}>
            Avbryt
          </Button>
          <Button
            variant='danger'
            className='d-flex gap-2 align-items-center justify-content-center'
            onClick={() => deleteCustomer()}
          >
            <BsFillTrashFill size={18} />
            <div>Ja, radera kunden</div>
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCustomerModal;
