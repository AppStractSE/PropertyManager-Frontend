import { Card, Col, Row } from "react-bootstrap";
import { AreaResponseDto } from "../../../api/client";
import AddArea from "../area/AddArea";

interface Props {
  areas: AreaResponseDto[];
}

const CreateArea = ({ areas }: Props) => {
  return (
    <Row className='my-5'>
      <Col md={12} lg={4}>
        <Card className='default-cursor'>
          <Card.Header className='fs-5'>Nuvarande områden</Card.Header>
          <Card.Body className='justify-content-center d-flex flex-column'>
            {areas
              .sort((a, b) => a.name!.localeCompare(b.name!))
              .map((area) => (
                <Card.Text key={area.id}>{area.name}</Card.Text>
              ))}
          </Card.Body>
        </Card>
      </Col>
      <Col md={12} lg={8}>
        <Card className='default-cursor'>
          <Card.Header className='fs-5'>Skapa område</Card.Header>
          <Card.Body className='justify-content-center d-flex flex-column'>
            <AddArea />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default CreateArea;
