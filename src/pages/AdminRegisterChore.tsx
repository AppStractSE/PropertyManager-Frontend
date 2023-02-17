import { motion } from "framer-motion";
import { useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { useQuery } from "react-query";
import { ChoreResponseDto, Client } from "../api/client";
import Search from "../components/Search";

const AdminRegisterChore = () => {
  const [searchValue, setSearchValue] = useState("");
  const client = new Client();

  const {
    data: chores,
    error: choresError,
    isLoading: choreIsLoading,
  } = useQuery<ChoreResponseDto[]>(["chores"], async () => await client.chore_GetAllChores(), {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const { data, error, isLoading } = useQuery<ChoreResponseDto[]>("chores", fetchChores);
  console.log(data);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Container className='mt-3'>
        <div className='w-25'>
          <Search value={searchValue} onChange={setSearchValue} />
        </div>
        <div>
          <ListGroup className='w-25 mt-2'>
            <ListGroup.Item>SA</ListGroup.Item>
            <ListGroup.Item>SB</ListGroup.Item>
            <ListGroup.Item>T3</ListGroup.Item>
            <ListGroup.Item>AHG</ListGroup.Item>
            {chores?.map((data) => (
              <ListGroup.Item key={data.id}>{data.title}</ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Container>
    </motion.div>
  );
};

export default AdminRegisterChore;
