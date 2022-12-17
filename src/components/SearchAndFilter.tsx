import { IoOptions } from "react-icons/io5";
import Search from "./Search";

interface Props {
  value: string;
  onChange: (value: string) => void;
  filterSearch: number;
}

const SearchAndFilter = ({ value, onChange, filterSearch }: Props) => {
  return (
    <div className='d-flex'>
      <Search value={value} onChange={onChange} filterSearch={filterSearch} />
      <IoOptions size={32} className='ms-3' />
    </div>
  );
};

export default SearchAndFilter;
