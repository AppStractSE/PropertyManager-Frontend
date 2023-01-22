import { Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const Search = ({ value, onChange }: Props) => {
  return (
    <Form
      className='flex-fill align-items-center'
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Form.Group controlId='searchCustomer' className='d-flex align-items-center form-control form-active'>
        <Form.Control
          type='text'
          name='searchCustomer'
          placeholder='Sök kund...'
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value ? <RxCross1 size={20} onClick={(e) => onChange("")} /> : <BsSearch size={20} />}
      </Form.Group>
    </Form>
  );
};

export default Search;
