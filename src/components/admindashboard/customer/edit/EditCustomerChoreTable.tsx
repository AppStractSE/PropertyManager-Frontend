import { Table } from "react-bootstrap";
import { CustomerChoreResponseDto, CustomerResponseDto, Periodic } from "../../../../api/client";
import EditCustomerChore from "./EditCustomerChoreRow";

interface Props {
  customerchores: CustomerChoreResponseDto[];
  periodics: Periodic[];
  customer: CustomerResponseDto;
}

const EditCustomerChoreTable = ({ customerchores, periodics, customer }: Props) => {
  return (
    <div>
      <Table hover>
        <thead>
          <tr>
            <th style={{ textTransform: "uppercase", fontSize: 12 }}>Namn</th>
            <th style={{ textTransform: "uppercase", fontSize: 12 }}>Frekvens</th>
            <th style={{ textTransform: "uppercase", fontSize: 12 }}>Period</th>
          </tr>
        </thead>
        <tbody>
      {customerchores
        .filter((x) => x.customerId === customer.id)
            .map((customerchore) => (
          <EditCustomerChore customerchore={customerchore} periodics={periodics} />
        ))}

        </tbody>
      </Table>

    </div>
  );
};

export default EditCustomerChoreTable;
