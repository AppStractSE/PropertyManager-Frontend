import { useState } from "react";
import { Card, Container } from "react-bootstrap";
import { BsChevronRight } from "react-icons/bs";
import { CustomerChore } from "../models/CustomerChore";
import ChoreInfo from "./modals/ChoreInfo";

interface Props {
  customerchore: CustomerChore;
}

const ChoreCard = ({ customerchore }: Props) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Card onClick={() => setModalShow(true)}>
        <Card.Header className='d-flex align-items-center'>
          <Container>
            <Card.Title>{customerchore.chore.title}</Card.Title>
            <Card.Title className='small text-muted'>Planteringsytor</Card.Title>
          </Container>
          <BsChevronRight size={24} />
        </Card.Header>
        <Card.Body>
          <Card.Title className='small text-muted'>Status</Card.Title>
          <Card.Text className='small p-2 status'>Ej påbörjad</Card.Text>
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
