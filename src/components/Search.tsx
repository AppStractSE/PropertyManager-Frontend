import { Form } from "react-bootstrap";

const Search = () => {
  return (
    <Form className='flex-fill'>
      <Form.Group controlId='formComment'>
        <Form.Control type='text' placeholder='Sök...' />
      </Form.Group>
    </Form>
  );
};

export default Search;
