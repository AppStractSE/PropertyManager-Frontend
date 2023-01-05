import { Card, Placeholder } from "react-bootstrap";

const ChoreCardSkeleton = () => {
  return (
    <Placeholder animation='wave'>
      <Card>
        <Card.Header>
          <Placeholder as={Card.Title} animation='wave'>
            <Placeholder xs={8} />
          </Placeholder>
          <Placeholder as={Card.Text} animation='wave'>
            <Placeholder xs={6} />
          </Placeholder>
        </Card.Header>
        <Card.Body>
          <Placeholder animation='wave' className='d-flex justify-content-between mt-2'>
            <Placeholder xs={3} className='p-3' />
            <Placeholder xs={3} />
          </Placeholder>
        </Card.Body>
      </Card>
    </Placeholder>
  );
};

export default ChoreCardSkeleton;
