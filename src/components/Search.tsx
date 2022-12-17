import { Form } from "react-bootstrap";

interface Props {
  value: string;
  onChange: (value: string) => void;
  filterSearch: number;
}

const Search = ({ value, onChange, filterSearch }: Props) => {
  return (
    <Form
      className='flex-fill'
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Form.Group controlId='searchCustomer'>
        <Form.Control
          type='text'
          name='searchCustomer'
          placeholder='Sök kund...'
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className='p mt-2'>
          Visar {filterSearch} st {filterSearch == 1 ? "kund" : "kunder"}
        </div>
      </Form.Group>
    </Form>
  );
};

export default Search;
