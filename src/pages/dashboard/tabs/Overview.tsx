import { useState } from "react";
import Chart from "react-apexcharts";
import { Button, Card, Form } from "react-bootstrap";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useClient } from "../../../contexts/ClientContext";
import { useQueries } from "../../../hooks/useQueries";

const Overview = () => {
  const [periodic, setPeriodic] = useState(0);
  const navigate = useNavigate();
  const { customers, customerchores } = useQueries();
  const [customerChoreData, setCustomerChoreData] = useState("Alla");
  const periodics = ["Alla", "Årligen", "Månadsvis", "Dagligen"];
  console.log(customerchores?.filter((x) => x.periodic?.name === periodics[periodic].toString()));

  const amountDone = customerchores?.filter(
    (x) =>
      (customerChoreData === "Alla" || x.customerId === customerChoreData) &&
      (periodic === 0 || x.periodic?.name === periodics[periodic]) &&
      x.status === "Klar",
  ).length;
  const amountStarted = customerchores?.filter(
    (x) =>
      (customerChoreData === "Alla" || x.customerId === customerChoreData) &&
      (periodic === 0 || x.periodic?.name === periodics[periodic]) &&
      x.status === "Påbörjad",
  ).length;
  const amountNotStarted = customerchores?.filter(
    (x) =>
      (customerChoreData === "Alla" || x.customerId === customerChoreData) &&
      (periodic === 0 || x.periodic?.name === periodics[periodic]) &&
      x.status === "Ej påbörjad",
  ).length;
  const colorPalette = ["#1fbd00", "#006ec2", "#fe2119"];
  const options = {
    chart: {
      type: "donut",
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        customScale: 0.8,
        donut: {
          size: "75%",
        },
      },

      stroke: {
        colors: undefined,
      },
    },
    colors: colorPalette,
    series: [amountDone, amountStarted, amountNotStarted],
    labels: ["Klara", "Påbörjade", "Ej påbörjade"],
    legend: {
      show: true,
      position: "right",
      offsetX: -30,
      offsetY: 10,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: function (val: string, opts: any) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex] + "st";
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.8,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
  };

  const latestactions = [
    {
      id: 1,
      name: "Kalle",
      action: "skapade en ny rapport för BRF Käpplunda",
      date: "2023-06-05",
      type: "success",
    },
    {
      id: 2,
      name: "Kalle",
      action: "raderade en kommentar på BRF Käpplunda",
      date: "2023-05-05",
      type: "delete",
    },
    {
      id: 3,
      name: "Johannes",
      action: "klarmarkerade Klipp gräset hos BRF Käpplunda",
      date: "2023-03-21",
      type: "success",
    },
    {
      id: 4,
      name: "Anton",
      action: "laddade upp en bild på BRF Motorn",
      date: "2023-02-01",
      type: "success",
    },
    {
      id: 5,
      name: "Hanna",
      action: "la till en kommentar på Klipp gräset hos BRF Käpplunda",
      date: "2023-01-01",
      type: "success",
    },
    {
      id: 6,
      name: "Angeliquie",
      action: "skapade ett nytt team: Team Berit",
      date: "20232-12-12",
      type: "success",
    },
    {
      id: 7,
      name: "System",
      action: "återställde veckovisa sysslor",
      date: "20232-12-18",
      type: "info",
    },
  ];

  const client = useClient();

  const {
    data: report,
    error: reportError,
    isLoading: reportLoading,
  } = useQuery<any>(
    ["report", "4cfe0ac0-2466-4d1d-66f0-08db57834341"],
    async () => await client.report_GetExcelReport("4cfe0ac0-2466-4d1d-66f0-08db57834341"),
  );

  const downloadFile = (data: Blob, fileName: string) => {
    const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = () => {
    const reportData = report.data;
    const fileName = `"Rapport.xlsx"`;
    downloadFile(reportData, fileName);
  };

  return (
    <>
      <div className='p-3 my-2 border-1 border-bottom'>
        <div className='h1 mb-0'>Översikt</div>
      </div>
      <div className='p-3'>
        <div>
          <Button
            className='d-flex gap-2 align-items-center justify-content-center'
            onClick={handleDownload}
          >
            <HiOutlineDocumentReport size={18} />
            <div>Skapa rapport</div>
          </Button>
        </div>

        <div className='row'>
          <div className='col-8'>
            <div className='row'>
              <div className='col-12 col-md-6 col-lg-6 my-4'>
                <Card className='p-3 rounded border default-cursor'>
                  <div className='d-flex align-items-center mb-2'>
                    <div className='h4 me-auto'>Sysslor</div>
                    <Form.Select
                      value={customerChoreData}
                      className='rounded-0 w-auto'
                      onChange={(e) => setCustomerChoreData(e.target.value)}
                    >
                      <option value={"Alla"}>Alla kunder</option>
                      {customers?.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                          {customer.name}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                  <div className='mt-4 mb-2 d-flex gap-2 flex-wrap'>
                    <Button
                      onClick={() => setPeriodic(0)}
                      className={`rounded border border-dark px-3 py-1 ${
                        periodic === 0 && "bg-dark"
                      }`}
                    >
                      Alla
                    </Button>
                    <Button
                      onClick={() => setPeriodic(1)}
                      className={`rounded border border-dark px-3 py-1 ${
                        periodic === 1 && "bg-dark"
                      }`}
                    >
                      År
                    </Button>
                    <Button
                      onClick={() => setPeriodic(2)}
                      className={`rounded border border-dark px-3 py-1  ${
                        periodic === 2 && "bg-dark"
                      }`}
                    >
                      Månad
                    </Button>
                    <Button
                      onClick={() => setPeriodic(3)}
                      className={`"rounded border border-dark px-3 py-1  ${
                        periodic === 3 && "bg-dark"
                      }`}
                    >
                      Vecka
                    </Button>
                  </div>
                  <Chart series={options.series} options={options} type='donut' />
                </Card>
              </div>

              <div className='col-12 col-md-6 col-lg-6 my-4'>
                <Card className='p-3 rounded border default-cursor'>
                  <div className='d-flex align-items-center mb-2'>
                    <div className='h4 me-auto'>Sysslor</div>
                    <Form.Select
                      value={customerChoreData}
                      className='rounded-0 w-auto'
                      onChange={(e) => setCustomerChoreData(e.target.value)}
                    >
                      <option value={"Alla"}>Alla kunder</option>
                      {customers?.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                          {customer.name}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                  <div className='mt-4 mb-2 d-flex gap-2 flex-wrap'>
                    <Button
                      onClick={() => setPeriodic(0)}
                      className={`rounded border border-dark px-3 py-1 ${
                        periodic === 0 && "bg-dark"
                      }`}
                    >
                      Alla
                    </Button>
                    <Button
                      onClick={() => setPeriodic(1)}
                      className={`rounded border border-dark px-3 py-1 ${
                        periodic === 1 && "bg-dark"
                      }`}
                    >
                      År
                    </Button>
                    <Button
                      onClick={() => setPeriodic(2)}
                      className={`rounded border border-dark px-3 py-1  ${
                        periodic === 2 && "bg-dark"
                      }`}
                    >
                      Månad
                    </Button>
                    <Button
                      onClick={() => setPeriodic(3)}
                      className={`"rounded border border-dark px-3 py-1  ${
                        periodic === 3 && "bg-dark"
                      }`}
                    >
                      Vecka
                    </Button>
                  </div>
                  <Chart series={options.series} options={options} type='donut' />
                </Card>
              </div>

              <div className='col-12 col-md-6 col-lg-6 my-4'>
                <Card className='p-3 rounded border default-cursor'>
                  <div className='d-flex align-items-center mb-2'>
                    <div className='h4 me-auto'>Sysslor</div>
                    <Form.Select
                      value={customerChoreData}
                      className='rounded-0 w-auto'
                      onChange={(e) => setCustomerChoreData(e.target.value)}
                    >
                      <option value={"Alla"}>Alla kunder</option>
                      {customers?.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                          {customer.name}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                  <div className='mt-4 mb-2 d-flex gap-2 flex-wrap'>
                    <Button
                      onClick={() => setPeriodic(0)}
                      className={`rounded border border-dark px-3 py-1 ${
                        periodic === 0 && "bg-dark"
                      }`}
                    >
                      Alla
                    </Button>
                    <Button
                      onClick={() => setPeriodic(1)}
                      className={`rounded border border-dark px-3 py-1 ${
                        periodic === 1 && "bg-dark"
                      }`}
                    >
                      År
                    </Button>
                    <Button
                      onClick={() => setPeriodic(2)}
                      className={`rounded border border-dark px-3 py-1  ${
                        periodic === 2 && "bg-dark"
                      }`}
                    >
                      Månad
                    </Button>
                    <Button
                      onClick={() => setPeriodic(3)}
                      className={`"rounded border border-dark px-3 py-1  ${
                        periodic === 3 && "bg-dark"
                      }`}
                    >
                      Vecka
                    </Button>
                  </div>
                  <Chart series={options.series} options={options} type='donut' />
                </Card>
              </div>
            </div>
          </div>
          <div className='col-4'>
            <div className='col-12 my-4'>
              <Card className='rounded p-3 border default-cursor'>
                <div className='h5 me-auto'>Senaste händelser</div>
                <div className='d-flex flex-column gap-2 timeline'>
                  {latestactions?.map((action) => (
                    <div key={action.id} className='d-flex relative position-relative'>
                      <div
                        className={`timeline-dot ${action.type === "info" ? "bg-warning" : ""} ${action.type === "success" ? "bg-success" : ""} ${action.type === "delete" ? "bg-danger" : ""}`}
                      />
                      <div style={{ marginLeft: 20 }}>
                        <div className='fs-7'>{action.date}</div>
                        <div className='fs-7'>
                          {action.name} {action.action}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
