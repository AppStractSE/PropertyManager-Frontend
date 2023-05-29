import React from "react";
import { Table } from "react-bootstrap";
import { CustomerChoreResponseDto, CustomerResponseDto, Periodic } from "../../../../api/client";
import EditCustomerChoreRow from "./EditCustomerChoreRow";

interface Props {
  customerchores: CustomerChoreResponseDto[];
  periodics: Periodic[];
  customer: CustomerResponseDto;
  search: string;
}

const EditCustomerChoreTable = ({ customerchores, periodics, customer, search }: Props) => {
  return (
    <Table hover striped className='mt-3'>
      <thead>
        <tr>
          <th className='text-uppercase fs-7'>Namn</th>
          <th className='text-uppercase fs-7'>Frekvens</th>
          <th className='text-uppercase fs-7'>Period</th>
          <th className='text-uppercase fs-7'>Alternativ</th>
        </tr>
      </thead>
      <tbody>
        {customerchores
          .filter((x) => x.customerId === customer.id)
          .filter((x) => x.chore?.title?.toLowerCase().includes(search.toLowerCase()))
          .map((customerchore) => (
            <EditCustomerChoreRow
              key={customerchore.id}
              customerchore={customerchore}
              periodics={periodics}
            />
          ))}
      </tbody>
    </Table>
  );
};

export default EditCustomerChoreTable;
