import { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { CustomerChore } from "../models/CustomerChore";
import ChoreInfo from "./modals/ChoreInfo";

interface Props {
  customerchore: CustomerChore;
}

const ChoreCard = ({ customerchore }: Props) => {
  const [modalShow, setModalShow] = useState(false);

  function getStatus() {
    // if (thisChoreHasChoreStatuses) return "Påbörjad"
    // if (thisChoreHasChoreStatuses which is equal to Frequency) return "Klar"
    // else return "Ej påbörjad"
    return "Ej påbörjad";
  }

  return (
    <>
      <Card onClick={() => setModalShow(true)}>
        <Card.Header className='d-flex align-items-center'>
          <Container>
            <Card.Title>{customerchore.chore.title}</Card.Title>
            <Card.Title className='small text-muted'>Planteringsytor</Card.Title>
          </Container>
        </Card.Header>
        <Card.Body className='d-flex align-items-end'>
          <div className='me-auto'>
            <Card.Title className='small text-muted'>Status</Card.Title>
            <Card.Text className='small p-2 status'>{getStatus()}</Card.Text>
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
