import { useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Chore } from "../models/Chore";
import ChoreInfo from "./modals/ChoreInfo";

interface Props {
  chore: Chore;
}

const ChoreCard = ({ chore }: Props) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Card onClick={() => setModalShow(true)}>
        <Card.Body>
          <Container className='d-flex align-items-center'>
            <Container>
              <Card.Text>{chore.name}</Card.Text>
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
        chore={chore}
      />
    </>
  );
};

export default ChoreCard;
