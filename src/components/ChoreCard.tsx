import { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useQuery } from "react-query";
import useAxios from "../hooks/useAxios";
import { CustomerChore } from "../models/CustomerChore";
import ChoreInfoCard from "./modals/CustomerChore";

interface Props {
  customerchore: CustomerChore;
}

const ChoreCard = ({ customerchore }: Props) => {
  const [modalShow, setModalShow] = useState(false);
  const fetchChoreStatuses = useAxios({
    url: `/ChoreStatus/GetChoreStatusById?Id=${customerchore.id}`,
    method: "get",
  });
  const {
    data: choreStatuses,
    error: choreStatusError,
    isLoading: choreStatusIsLoading,
    refetch: refetchChoreStatuses,
  } = useQuery<any>("status_" + customerchore.id, fetchChoreStatuses);

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

            {(() => {
              if (choreStatusIsLoading) {
                return <></>;
              }
              if (choreStatuses.length === customerchore.frequency) {
                return <Card.Text className='small p-2 status completed'>Klar</Card.Text>;
              } else if (choreStatuses.length > 0) {
                return <Card.Text className='small p-2 status initiated'>Påbörjad</Card.Text>;
              } else {
                return (
                  <Card.Text className='small p-2 status not-initiated'>Ej påbörjad</Card.Text>
                );
              }
            })()}
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
