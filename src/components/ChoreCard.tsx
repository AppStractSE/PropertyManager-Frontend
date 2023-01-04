import { useState } from "react";
import { Card } from "react-bootstrap";
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
        <Card.Body>
          <Card.Text as='h5'>{customerchore.chore.title}</Card.Text>
          <Card.Text
            as='p'
            className='small p-1 status'
          >
            Ej påbörjad
          </Card.Text>
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
