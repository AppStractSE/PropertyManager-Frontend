import { Button, Card, Dropdown, Form } from "react-bootstrap";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoEllipsisVertical } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import LineChart from "../charts/LineChart";
import CustomerOverviewCard from "../overview/CustomerOverviewCard";
import { useState } from "react";

const Meeting = () => {
  const [teamValue, setTeamValue] = useState<string>("");
  const [periodValue, setPeriodValue] = useState<string>("");
  return (
    <>
      <div className='p-4 border-1 border-bottom'>
        <div className='h2 mb-0'>Veckomöte</div>
      </div>
      <div className='p-4'>
        <div className='row'>
          {/* <div className='col-12 col-md-6 col-xl-3'>
            <Card className='d-flex flex-row pt-3 px-3 default-cursor'>
              <div className='col-6'>
                <div className='h5 mb-0'>Avklarade</div>
              </div>
              <div className='col-6'>
                <LineChart data={[5, 27, 12, 30, 40]} />
              </div>
            </Card>
          </div>
          <div className='col-12 col-md-6 col-xl-3'>
            <Card className='d-flex flex-row pt-3 px-3 default-cursor'>
              <div className='col-6'>
                <div className='h5 mb-0'>Påbörjade</div>
              </div>
              <div className='col-6'>
                <LineChart data={[5, 27, 12, 30, 40]} />
              </div>
            </Card>
          </div>
          <div className='col-12 col-md-6 col-xl-3'>
            <Card className='d-flex flex-row pt-3 px-3 default-cursor'>
              <div className='col-6'>
                <div className='h5 mb-0'>Inte påbörjade</div>
              </div>
              <div className='col-6'>
                <LineChart data={[5, 27, 12, 30, 40]} />
              </div>
            </Card>
          </div> */}
          <Form.Group className='row'>
            <Form.Group className='mb-3 col-3'>
              <Form.Label>Teams</Form.Label>
              <Form.Select
                value={""}
                onChange={(e) => setTeamValue(e.target.value)}
                className='form-active'
              >
                <option>Välj team</option>
                {/* {teams &&
              teams.map((team: TeamResponseDto) => {
                return (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                );
              })} */}
              </Form.Select>
            </Form.Group>
            <Form.Group className='mb-3 col-3'>
              <Form.Label>Period</Form.Label>
              <Form.Select
                value={""}
                onChange={(e) => setPeriodValue(e.target.value)}
                className='form-active'
              >
                <option>Välj period</option>
                {/* {teams &&
              teams.map((team: TeamResponseDto) => {
                return (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                );
              })} */}
              </Form.Select>
            </Form.Group>
          </Form.Group>

          <div className='col-12 col-md-6 col-xl-3'>
            <Card className='d-flex justify-content-between'>
              <div className='fs-4'>BRF Motorn [Visar alla]</div>
              {Array.from({ length: 35 }).map((_, i) => (
                <div className='d-flex align-items-center p-2 m-2 bg-warning' key={i}>
                  <div>Syssla {i + 1}</div>
                  <div className='ms-auto'>3/4</div>
                </div>
              ))}
            </Card>
          </div>

          <div className='col-12 col-md-6 col-xl-3'>
            <Card className='d-flex justify-content-between'>
              <div className='fs-4'>BRF Asd</div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div className='d-flex align-items-center' key={i}>
                  Syssla {i + 1}
                </div>
              ))}
            </Card>
          </div>

          <div className='col-12 col-md-6 col-xl-3'>
            <Card className='d-flex justify-content-between'>
              <div className='fs-4'>BRF Motorn</div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div className='d-flex align-items-center' key={i}>
                  Syssla {i + 1}
                </div>
              ))}
            </Card>
          </div>

          <div className='col-12 col-md-6 col-xl-3'>
            <Card className='d-flex justify-content-between'>
              <div className='fs-4'>BRF Asd</div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div className='d-flex align-items-center' key={i}>
                  Syssla {i + 1}
                </div>
              ))}
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

export default Meeting;
