import { useState } from "react";
import { Button, Card, Dropdown, Form } from "react-bootstrap";
import { IoEllipsisVertical } from "react-icons/io5";
import LineChart from "../charts/LineChart";
import CustomerOverviewCard from "../overview/CustomerOverviewCard";

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
          <Form.Group className='row'>
            <Form.Group className='mb-3 col-3'>
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

          <div className='overflow-hidden'>
            <div className='row flex-nowrap overflow-auto' style={{ maxHeight: 750 }}>
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
                  <div className='fs-4'>BRF Asd</div>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div className='d-flex align-items-center' key={i}>
                      Syssla {i + 1}
                    </div>
                  ))}
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Meeting;
