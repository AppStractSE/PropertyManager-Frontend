import { useState } from "react";
import { IoOptions } from "react-icons/io5";
import FilterOptions from "./modals/FilterOptions";
import Search from "./Search";

interface Props {
  value: string;
  onChange: (value: string) => void;
  filterSearch: number;
}

const SearchAndFilter = ({ value, onChange, filterSearch }: Props) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <div className='d-flex align-items-center'>
        <Search value={value} onChange={onChange} />
        <IoOptions onClick={() => setModalShow(true)} size={32} className='ms-3' />
      </div>
      <div className='p small'>
        Visar {filterSearch} st {filterSearch == 1 ? "kund" : "kunder"}
      </div>
      <FilterOptions
        show={modalShow}
        onHide={() => setModalShow(false)}
        filterSearch={filterSearch}
      />
    </>
  );
};

export default SearchAndFilter;
