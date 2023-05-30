import { Placeholder } from "react-bootstrap";
import React from "react";

const SearchSkeleton = () => {
  return (
    <>
      <Placeholder as='h1' animation='wave'>
        <Placeholder xs={6} md={4} />
      </Placeholder>
      <Placeholder as='h2' animation='wave'>
        <Placeholder xs={12} />
      </Placeholder>
    </>
  );
};

export default SearchSkeleton;
