import { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { CustomerChoreResponseDto } from "../api/client";
import { useClient } from "../contexts/ClientContext";
import ChoreInfo from "./modals/ChoreInfo";

interface Props {
  customerchore: CustomerChoreResponseDto;
}

const ChoreCard = ({ customerchore }: Props) => {
  const [modalShow, setModalShow] = useState(false);
  const client = useClient();

  return (
    <>
      <Card onClick={() => setModalShow(true)}>
        <Card.Header className='d-flex align-items-center'>
          <Container>
            <Card.Title>{customerchore.chore!.title}</Card.Title>
            <Card.Title className='small text-muted'>Planteringsytor</Card.Title>
          </Container>
        </Card.Header>
        <Card.Body className='d-flex align-items-end'>
          <div className='me-auto'>
            <Card.Title className='small text-muted'>Status</Card.Title>
            <Card.Text
              className={`small p-2 status ${
                customerchore.status === "Klar"
                  ? "completed"
                  : customerchore.status === "Påbörjad"
                  ? "initiated"
                  : "not-initiated"
              }`}
            >
              {customerchore.status}
            </Card.Text>
          </div>
          <Button>Läs mer</Button>
        </Card.Body>
      </Card>
      <ChoreInfo
        show={modalShow}
        onHide={() => setModalShow(false)}
        customerchore={customerchore}
      />
    </>
  );
};

export default ChoreCard;
