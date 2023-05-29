import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import { CustomerResponseDto } from "../../../../api/client";
import DeleteCustomerModal from "./DeleteCustomerModal";

interface Props {
  customer: CustomerResponseDto;
}
const DeleteCustomer = ({ customer }: Props) => {
  const [deleteCustomerModal, setDeleteCustomerModal] = useState(false);
  return (
    <>
      <Button
        variant='danger'
        size='sm'
        className='d-flex align-items-center gap-2 ms-auto'
        onClick={() => setDeleteCustomerModal(!deleteCustomerModal)}
      >
        <BsFillTrashFill size={18} />
        <div>Radera kund</div>
      </Button>
      <DeleteCustomerModal
        show={deleteCustomerModal}
        onHide={() => setDeleteCustomerModal(!deleteCustomerModal)}
        customer={customer}
      />
    </>
  );
};

export default DeleteCustomer;
