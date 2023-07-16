import { lazy, useState } from "react";
import { Form } from "react-bootstrap";
import CreateReport from "../../../components/report/CreateReport";
import { useQueries } from "../../../hooks/useQueries";
lazy(() => import("../../../components/report/CreateReport"));

const ReportTab = () => {
  const [customerId, setCustomerId] = useState<string>("-1");
  const { customers } = useQueries();

  console.log(customerId);

  return (
    <div>
      <Form.Select
        value={customerId}
        className='rounded-0 w-auto'
        onChange={(e) => setCustomerId(e.target.value)}
      >
        <option value={"-1"}>Välj kund</option>
        {customers?.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.name}
          </option>
        ))}
      </Form.Select>
      <CreateReport customerId={customerId} />
    </div>
  );
};

export default ReportTab;
