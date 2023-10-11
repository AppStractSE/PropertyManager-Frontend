import { Button, Card, Dropdown, Form } from "react-bootstrap";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoEllipsisVertical } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import LineChart from "../charts/LineChart";
import CustomerOverviewCard from "../overview/CustomerOverviewCard";

const Overview = () => {
  const navigate = useNavigate();

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
      <div className='p-4 border-1 border-bottom'>
        <div className='h2 mb-0'>Översikt</div>
      </div>
      <div className='p-4'>
        <div className='d-flex gap-2'>
          <Button
            className='d-flex gap-2 align-items-center justify-content-center'
            onClick={() => navigate("/report")}
          >
            <HiOutlineDocumentReport size={24} />
            <div>Skapa rapport</div>
          </Button>
          <Button
            className='d-flex gap-2 align-items-center justify-content-center'
            onClick={() => navigate("/report")}
          >
            <HiOutlineDocumentReport size={24} />
            <div>Skapa kund</div>
          </Button>
        </div>
        <div className='row mt-4'>
          <div className='col-12 col-md-6 col-xl-3'>
            <Card className='d-flex flex-row pt-3 px-3 default-cursor'>
              <div className='col-6'>
                <div className='h5 mb-0'>Senaste grejjen</div>
              </div>
              <div className='col-6'>
                <LineChart data={[5, 27, 12, 30, 40]} />
              </div>
            </Card>
          </div>

          <div className='col-12 col-md-6 col-xl-3'>
            <Card className='d-flex justify-content-between'>
              <LineChart data={[5, 27, 12, 30, 40]} />
            </Card>
          </div>

          <div className='col-12 col-md-6 col-xl-3'>
            <Card className='d-flex justify-content-between'>
              <LineChart data={[5, 27, 12, 30, 40]} />
            </Card>
          </div>

          <div className='col-12 col-md-6 col-xl-3'>
            <Card className='d-flex justify-content-between'>
              <LineChart data={[5, 27, 12, 30, 40]} />
            </Card>
          </div>
        </div>
        <div className='row mt-4'>
          <div className='col-12 col-sm-6 col-xl-3 mt-4 mt-md-0 d-flex flex-column gap-4'>
            <Card className='rounded border default-cursor flex-fill'>
              <div>
                <LineChart data={[50, 40, 30, 20, 10]} />
              </div>
            </Card>
            <Card className='rounded border default-cursor flex-fill'>
              <div className='d-flex gap-2 p-3'>
                <LineChart data={[5, 27, 12, 30, 40]} />
              </div>
            </Card>
            <Card className='rounded border default-cursor flex-fill'>
              <LineChart data={[5, 15, 23, 1, 5]} />
            </Card>
          </div>

          <div className='col-12 col-sm-6 col-xl-4 mt-4 mt-md-0'>
            <CustomerOverviewCard />
          </div>

          <div className='col-12 col-md-5 mt-4 mt-md-0'>
            <Card className='rounded border default-cursor h-100' style={{ maxHeight: 500 }}>
              <div className='d-flex align-items-center p-3 border-1 border-bottom'>
                <div className='h4 mb-0 me-auto'>Aktivitetsflöde</div>
                <Dropdown className='dropdown-ellipsis-container'>
                  <Dropdown.Toggle className='dropdown-ellipsis'>
                    <IoEllipsisVertical size={24} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ width: "max-content" }}>
                    <div className='d-flex flex-column gap-2'>
                      <div className='d-flex gap-2 align-items-center px-2'>
                        <Form.Check className='d-flex align-items-center' type='checkbox' checked />
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
