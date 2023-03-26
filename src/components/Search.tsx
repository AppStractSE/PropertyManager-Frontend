import { Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const Search = ({ value, onChange, placeholder }: Props) => {
  return (
    <Form
      className='flex-fill align-items-center'
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Form.Group controlId='search' className='d-flex align-items-center form-control form-active'>
        <Form.Control
          type='text'
          autoComplete='off'
          placeholder={`Sök ${placeholder}...`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value ? (
          <RxCross1 size={22} onClick={() => onChange("")} className='me-2' />
        ) : (
          <BsSearch size={22} className='me-2' />
        )}
      </Form.Group>
    </Form>
  );
};

export default Search;
