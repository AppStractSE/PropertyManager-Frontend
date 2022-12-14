import { Card, Container } from "react-bootstrap";
import { Chore } from "../models/Chore";

interface Props {
  chore: Chore;
}

const ChoreCard = ({ chore }: Props) => {
  return (
    <Card onClick={() => console.log(`Open modal for ${chore.name}`)}>
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
  );
};

export default ChoreCard;
