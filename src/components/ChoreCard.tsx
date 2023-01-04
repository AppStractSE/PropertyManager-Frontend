import { useState } from "react";
import { Card, Container } from "react-bootstrap";
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
          <Container className='d-flex align-items-center'>
            <Container>
              <Card.Text>{customerchore.chore.title}</Card.Text>
            </Container>
            {/* Make into component */}
            <div style={{ height: 12, width: 12, background: "red", borderRadius: "50%" }}></div>
            {/* Make into component */}
          </Container>
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
