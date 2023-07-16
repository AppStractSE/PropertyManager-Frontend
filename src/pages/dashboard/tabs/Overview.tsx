import { useState } from "react";
import Chart from "react-apexcharts";
import { Button, Card, Dropdown, Form } from "react-bootstrap";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoEllipsisVertical } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useQueries } from "../../../hooks/useQueries";

const Overview = () => {
  const [periodic, setPeriodic] = useState(0);
  const navigate = useNavigate();
  const { customers, customerchores } = useQueries();
  const [customerChoreData, setCustomerChoreData] = useState("Alla");
  const periodics = ["Alla", "Årligen", "Månadsvis", "Veckovis"];
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
  const options: any = {
    chart: {
      type: "donut",
      offsetY: -25,
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
      position: "bottom",
      offsetX: 0,
      offsetY: -20,
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
    {
      id: 7,
      name: "System",
      action: "återställde veckovisa sysslor",
      date: "20232-12-18",
      type: "info",
    },
    {
      id: 7,
      name: "System",
      action: "återställde veckovisa sysslor",
      date: "20232-12-18",
      type: "info",
    },
    {
      id: 7,
      name: "System",
      action: "återställde veckovisa sysslor",
      date: "20232-12-18",
      type: "info",
    },
  ];

  return (
    <>
      <div className='p-4 my-2 border-1 border-bottom'>
        <div className='h2 mb-0'>Översikt</div>
      </div>
      <div className='p-4'>
        <div className='d-flex gap-2'>
          <Button
            className='d-flex gap-2 align-items-center justify-content-center'
            onClick={() => navigate("/report")}
          >
            <HiOutlineDocumentReport size={18} />
            <div>Skapa rapport</div>
          </Button>
          <Button
            className='d-flex gap-2 align-items-center justify-content-center'
            onClick={() => navigate("/report")}
          >
            <HiOutlineDocumentReport size={18} />
            <div>Skapa kund</div>
          </Button>
        </div>
        <div className='row mt-4'>

          <div className='col-12 col-sm-6 col-xl-4 mt-4 mt-md-0'>
            <Card className='rounded border default-cursor h-100' style={{ maxHeight: 500 }}>
              <div className='d-flex align-items-center p-3 border-1 border-bottom'>
                <div className='h4 mb-0 me-auto'>Sysslor</div>
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
                {/* <div className='d-flex gap-2 me-2 flex-wrap'>
                <Button variant="outline-primary" size="sm"
                    onClick={() => setPeriodic(0)}
                    active={periodic === 0}
                  className={`rounded-pill px-3 py-1`}
                >
                  Alla
                </Button>
                <Button variant="outline-primary" size="sm"
                    onClick={() => setPeriodic(1)}
                    active={periodic === 1}
                  className={`rounded-pill px-3 py-1`}
                >
                  År
                </Button>
                <Button variant="outline-primary" size="sm"
                    onClick={() => setPeriodic(2)}
                    active={periodic === 2}
                  className={`rounded-pill px-3 py-1`}
                >
                  Månad
                </Button>
                <Button variant="outline-primary" size="sm"
                    onClick={() => setPeriodic(3)}
                    active={periodic === 3}
                  className={`rounded-pill px-3 py-1`}
                >
                  Vecka
                </Button>

              </div> */}
                <IoEllipsisVertical size={24} />
              </div>

              <Chart series={options.series} options={options} type='donut' height={"100%"} />
            </Card>
          </div>

          
          <div className='col-12 col-md-4 mt-4 mt-md-0'>
            <Card className='rounded border default-cursor h-100' style={{ maxHeight: 500 }}>
              <div className='d-flex align-items-center p-3 border-1 border-bottom'>
                <div className='h4 mb-0 me-auto'>Aktivitetsflöde</div>

                <Dropdown className='dropdown-ellipsis-container'>
                  <Dropdown.Toggle className='dropdown-ellipsis'>
                    <IoEllipsisVertical size={24} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ width: "max-content" }}>
                    <div className="d-flex flex-column gap-2">
                    <div className="d-flex gap-2 align-items-center px-2">
                    <Form.Check className='d-flex align-items-center' type="checkbox" checked />
                    <div>Visa systemmeddelanden</div>
                    </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>

              </div>
              <div className='px-3 py-2 overflow-auto border-1 border-bottom'>
                <div className='d-flex flex-column gap-2 timeline'>
                  {latestactions?.map((action) => (
                    <div key={action.id} className='d-flex position-relative'>
                      <div
                        className={`timeline-dot ${action.type === "info" ? "bg-warning" : ""} ${
                          action.type === "success" ? "bg-success" : ""
                        } ${action.type === "delete" ? "bg-danger" : ""}`}
                      />
                      <div className='ms-4'>
                        <div className='fs-7'>{action.date}</div>
                        <div className='fs-6'>
                          {action.name} {action.action}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='my-2 mx-auto'>
                <Button className='rounded-pill px-5 fs-7'>Visa alla meddelanden</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
