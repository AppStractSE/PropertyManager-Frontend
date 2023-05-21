import { useState } from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";
import { AreaResponseDto, CityResponseDto } from "../../../api/client";
import Search from "../../Search";
import AddArea from "../area/AddArea";

interface Props {
  areas: AreaResponseDto[];
  cities: CityResponseDto[];
}

const CreateArea = ({ areas, cities }: Props) => {
  const [search, setSearch] = useState("");
  return (
    <Row className='my-5'>
      <Col md={12} lg={4} className='mb-3'>
        <Card className='default-cursor'>
          <Card.Header className='fs-5'>Nuvarande områden</Card.Header>
          <Card.Body className='justify-content-center d-flex flex-column'>
            {" "}
            <Search value={search} onChange={(value) => setSearch(value)} placeholder={"område"} />
            <Accordion flush defaultActiveKey={cities.map((city) => city.id.toString())} alwaysOpen>
              {cities
                .filter((city) => {
                  const cityAreas = areas.filter(
                    (area) =>
                      area.cityId === city.id &&
                      area.name?.toLowerCase().includes(search.trim().toLowerCase()),
                  );
                  return cityAreas.length > 0 || search.trim() === "";
                })
                .sort((a, b) => a.name!.localeCompare(b.name!))
                .map((city) => {
                  const cityAreas = areas
                    .filter(
                      (area) =>
                        area.cityId === city.id &&
                        area.name?.toLowerCase().includes(search.trim().toLowerCase()),
                    )
                    .sort((a, b) => a.name!.localeCompare(b.name!));

                  return (
                    <Accordion.Item eventKey={city.id.toString()} key={city.id}>
                      <Accordion.Header>{city.name}</Accordion.Header>
                      <Accordion.Body>
                        {cityAreas.length > 0
                          ? cityAreas.map((area) => (
                              <Card.Text className='ms-2' key={area.id}>
                                {area.name}
                              </Card.Text>
                            ))
                          : search.trim() === "" && (
                              <Card.Text className='ms-2 fst-italic'>Inga områden här ännu</Card.Text>
                            )}
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })}
            </Accordion>
          </Card.Body>
        </Card>
      </Col>
      <Col md={12} lg={8}>
        <Card className='default-cursor'>
          <Card.Header className='fs-5'>Skapa område</Card.Header>
          <Card.Body className='justify-content-center d-flex flex-column'>
            <AddArea cities={cities} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default CreateArea;
