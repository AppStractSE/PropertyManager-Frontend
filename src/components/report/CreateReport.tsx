import { Button, Spinner } from "react-bootstrap";
import { useQuery } from "react-query";
import { CustomerResponseDto } from "../../api/client";
import { useClient } from "../../contexts/ClientContext";
import downloadReport from "../../utils/downloadReport";

interface Props {
  customerId: string;
}

const CreateReport = ({ customerId }: Props) => {
  const client = useClient();

  const {
    data: customer,
    error: customerError,
    isLoading: customerLoading,
  } = useQuery<CustomerResponseDto>(
    ["customerReport", customerId],
    async () => await client.customer_GetCustomerById(customerId),
    {
      enabled: customerId !== "-1",
    },
  );

  const {
    data: report,
    error: reportError,
    isLoading: reportLoading,
  } = useQuery<any>(
    ["report", customerId],
    async () => await client.report_GetExcelReport(customerId),
    {
      enabled: customerId !== "-1",
    },
  );

  const {
    data: reactReport,
    error: reactReportError,
    isLoading: reactReportLoading,
  } = useQuery<any>(
    ["reactReport", customerId],
    async () => await client.report_GetCustomerReport(customerId),
    {
      enabled: customerId !== "-1",
    },
  );
  const handleDownload = downloadReport(report, customer);

  return (
    <div>
      <Button disabled={!customer} onClick={handleDownload}>
        {customerLoading || reportLoading ? <Spinner size='sm' /> : undefined}
        Skapa rapport
      </Button>
      {customer ? <div>{customer.name}</div> : undefined}
      {/* {customer && reactReport ? <RenderReport reactReport={reactReport} /> : undefined} */}
      {/* {customer && reactReport && (
        <div>
          <h2>Customer Information</h2>
          <div>ID: {reactReport.customerInfo.id}</div>
          <div>Name: {reactReport.customerInfo.name}</div>
          <div>Address: {reactReport.customerInfo.address}</div>

          <h2>Issuer Information</h2>
          <div>ID: {reactReport.issuerInfo.id}</div>
          <div>Name: {reactReport.issuerInfo.name}</div>
          <div>Address: {reactReport.issuerInfo.address}</div>
          <div>Email: {reactReport.issuerInfo.email}</div>
          <div>Phone Number: {reactReport.issuerInfo.phoneNumber}</div>

          <h2>Chore Rows</h2>
          {reactReport.choreRows.map((choreRow, index) => (
            <div key={index}>
              <div>Chore Name: {choreRow.choreName}</div>
              <div>
                <strong>Month Results:</strong>
              </div>
              {choreRow.monthResult.map((month, index) => (
                <div key={index}>
                  Month {month.monthNr}: {month.progress}
                </div>
              ))}
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default CreateReport;
