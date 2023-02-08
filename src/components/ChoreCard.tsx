import { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useQuery } from "react-query";
import { ChoreStatusResponseDto, Client, CustomerChoreResponseDto } from "../api/client";
import ChoreInfoCard from "./modals/CustomerChore";

interface Props {
  customerchore: CustomerChoreResponseDto;
}

const ChoreCard = ({ customerchore }: Props) => {
  const [modalShow, setModalShow] = useState(false);
  const client = new Client();
  const { data: choreStatus } = useQuery<ChoreStatusResponseDto[]>(
    ["choreStatus", customerchore.id],
    async () => await client.choreStatus_GetChoreStatusById(customerchore.id),
  );

  // const fetchChoreStatuses = useAxios({
  //   url: `/ChoreStatus/GetChoreStatusById?Id=${customerchore.id}`,
  //   method: "get",
  // });
  // const {
  //   data: choreStatuses,
  //   error: choreStatusError,
  //   isLoading: choreStatusIsLoading,
  // } = useQuery<CustomerChoreResponseDto[]>("status_" + customerchore.id, fetchChoreStatuses);

  return (
    <>
      <Card onClick={() => setModalShow(true)}>
        <Card.Header className='d-flex align-items-center'>
          <Container>
            <Card.Title>{customerchore.chore.title}</Card.Title>{" "}
            {/*TODO: Ternary operator to remove the customerchore.chore is possibly undefined?w*/}
            <Card.Title className='small text-muted'>Planteringsytor</Card.Title>
          </Container>
        </Card.Header>
        <Card.Body className='d-flex align-items-end'>
          <div className='me-auto'>
            <Card.Title className='small text-muted'>Status</Card.Title>

            {/* if (choreStatusIsLoading) {
                return <></>;
              } */}

            {(() => {
              if (!choreStatus) {
                // TODO: Se över denna kanske, satt som ersättare för den utkommenterade koden ovanför?
                return <></>;
              }
              if (choreStatus && choreStatus.length === customerchore.frequency) {
                return <Card.Text className='small p-2 status completed'>Klar</Card.Text>;
              } else if (choreStatus && choreStatus.length > 0) {
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
