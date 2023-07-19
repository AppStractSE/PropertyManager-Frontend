import { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { IoEllipsisVertical } from "react-icons/io5";
import { useQueries } from "../../../hooks/useQueries";
import PieChart from "../charts/PieChart";

const CustomerOverviewCard = () => {
  const { customers, customerchores } = useQueries();
  const [periodic, setPeriodic] = useState(0);
  const [customerChoreData, setCustomerChoreData] = useState("Alla");

  const periodics = ["Alla", "Årligen", "Månadsvis", "Veckovis"];
  const amountDone = customerchores
    ? customerchores.filter(
        (x) =>
          (customerChoreData === "Alla" || x.customerId === customerChoreData) &&
          (periodic === 0 || x.periodic?.name === periodics[periodic]) &&
          x.status === "Klar",
      ).length
    : 0;

  const amountStarted = customerchores
    ? customerchores.filter(
        (x) =>
          (customerChoreData === "Alla" || x.customerId === customerChoreData) &&
          (periodic === 0 || x.periodic?.name === periodics[periodic]) &&
          x.status === "Påbörjad",
      ).length
    : 0;

  const amountNotStarted = customerchores
    ? customerchores.filter(
        (x) =>
          (customerChoreData === "Alla" || x.customerId === customerChoreData) &&
          (periodic === 0 || x.periodic?.name === periodics[periodic]) &&
          x.status === "Ej påbörjad",
      ).length
    : 0;

  const data = [amountDone, amountStarted, amountNotStarted];

  return (
    <Card className='rounded border default-cursor h-100' style={{ maxHeight: 500 }}>
      <div className='d-flex align-items-center p-3 border-1 border-bottom'>
        <div className='h4 mb-0 me-auto'>Kundöversikt</div>
        <Form.Select
          size='sm'
          value={customerChoreData}
          className='rounded-0 w-auto fs-7 me-2'
          onChange={(e) => setCustomerChoreData(e.target.value)}
        >
          <option value={"Alla"}>Alla kunder</option>
          {customers?.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </Form.Select>
        <IoEllipsisVertical size={24} />
      </div>
      {data ? <PieChart labels={["Klara", "Påbörjade", "Ej påbörjade"]} data={data} /> : null}
    </Card>
  );
};

export default CustomerOverviewCard;
