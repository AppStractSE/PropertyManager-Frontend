import { Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const Search = ({ value, onChange}: Props) => {
  return (
    <Form
      className='flex-fill align-items-center'
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Form.Group controlId='searchCustomer' className="d-flex align-items-center form-control">
        <Form.Control
          type='text'
          name='searchCustomer'
          placeholder='Sök kund...'
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <BsSearch size={20} />
      </Form.Group>
    </Form>
  );
};

export default Search;
