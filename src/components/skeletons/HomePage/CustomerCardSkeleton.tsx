import { Card, Placeholder } from "react-bootstrap";
import React from "react";

const CustomerCardSkeleton = () => {
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
          <Placeholder animation='wave'>
            <Placeholder xs={12} />
          </Placeholder>
        </Card.Body>
      </Card>
    </Placeholder>
  );
};

export default CustomerCardSkeleton;
