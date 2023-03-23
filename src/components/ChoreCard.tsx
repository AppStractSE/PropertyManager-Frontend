import { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useQuery } from "react-query";
import { ChoreStatusResponseDto, CustomerChoreResponseDto } from "../api/client";
import { useClient } from "../contexts/ClientContext";
import ChoreInfoCard from "./modals/CustomerChore";

interface Props {
  customerchore: CustomerChoreResponseDto;
}

const ChoreCard = ({ customerchore }: Props) => {
  const [modalShow, setModalShow] = useState(false);
  const client = useClient();
  const {
    data: choreStatus,
    error: choreStatusError,
    isLoading: choreStatusIsLoading,
  } = useQuery<ChoreStatusResponseDto[]>(
    ["choreStatus", customerchore.id],
    async () => await client.choreStatus_GetChoreStatusById(customerchore.id),
  );

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
            {!choreStatusIsLoading && (
              <Card.Text
                className={`small p-2 status ${
                  choreStatus && choreStatus.length === customerchore.frequency
                    ? "completed"
                    : choreStatus && choreStatus.length > 0
                    ? "initiated"
                    : "not-initiated"
                }`}
              >
                {choreStatus && choreStatus.length === customerchore.frequency
                  ? "Klar"
                  : choreStatus && choreStatus.length > 0
                  ? "Påbörjad"
                  : "Ej påbörjad"}
              </Card.Text>
            )}
          </div>
          <Button>Läs mer</Button>
        </Card.Body>
      </Card>
      <ChoreInfoCard
        show={modalShow}
        onHide={() => setModalShow(false)}
        customerchore={customerchore}
      />
    </>
  );
};

export default ChoreCard;
