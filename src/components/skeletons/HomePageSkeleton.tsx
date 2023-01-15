import { Container, Stack } from "react-bootstrap";
import CustomerCardSkeleton from "./HomePage/CustomerCardSkeleton";
import SearchSkeleton from "./SearchSkeleton";

const HomePageSkeleton = () => {
  return (
    <Container className='mt-3 mb-3'>
      <SearchSkeleton />
      <Stack direction='vertical' gap={3} className='mt-3'>
        {Array.from({ length: 3 }, (_, i) => (
          <CustomerCardSkeleton key={i} />
        ))}
      </Stack>
    </Container>
  );
};

export default HomePageSkeleton;
