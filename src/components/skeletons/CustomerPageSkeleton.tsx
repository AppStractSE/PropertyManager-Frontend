import { Container, Stack } from "react-bootstrap";
import ChoreCardSkeleton from "./CustomerPage/ChoreCardSkeleton";
import SearchSkeleton from "./SearchSkeleton";

const HomePageSkeleton = () => {
  return (
    <Container className='mt-3 mb-3'>
      <SearchSkeleton />
      <Stack direction='vertical' gap={3} className='mt-3'>
        {Array.from({ length: 3 }, (_, i) => (
          <ChoreCardSkeleton key={i} />
        ))}
      </Stack>
    </Container>
  );
};

export default HomePageSkeleton;
