import { IoOptions } from "react-icons/io5";
import Search from "./Search";

const SearchAndFilter = () => {
  return (
    <div className='d-flex'>
      <Search />
      <IoOptions size={32} className='ms-3' />
    </div>
  );
};

export default SearchAndFilter;
