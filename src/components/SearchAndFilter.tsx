import { IoOptions } from "react-icons/io5";
import Search from "./Search";

interface Props {
  value: string;
  onChange: (value: string) => void;
  filterSearch: number;
}

const SearchAndFilter = ({ value, onChange, filterSearch }: Props) => {
  return (
    <>
    <div className='d-flex align-items-center'>
      <Search value={value} onChange={onChange} />
      <IoOptions size={32} className='ms-3' />
    </div>
      <div className='p small'>
        Visar {filterSearch} st {filterSearch == 1 ? "kund" : "kunder"}
      </div>
    </>
  );
};

export default SearchAndFilter;
