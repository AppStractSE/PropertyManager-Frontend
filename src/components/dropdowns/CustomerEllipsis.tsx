import { Dropdown } from "react-bootstrap";
import { IoEllipsisVertical } from "react-icons/io5";
import { RiDirectionLine, RiFlagLine, RiInformationLine } from "react-icons/ri";
import { SlSupport } from "react-icons/sl";

interface Props {
  address?: string;
}

const CustomerEllipsis = ({ address }: Props) => {
  return (
    <Dropdown className='dropdown-ellipsis-container'>
      <Dropdown.Toggle className='dropdown-ellipsis'>
        <IoEllipsisVertical size={28} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          className='d-flex align-items-center'
          href={`https://maps.apple.com/?q=${address}`}
          target='_blank'
        >
          <RiDirectionLine className='me-2' size={24} />
          <span>Vägbeskrivning</span>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item className='d-flex align-items-center' href='#'>
          <RiInformationLine className='me-2' size={24} />
          <span>Kundinformation</span>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item className='d-flex align-items-center' href='#'>
          <SlSupport className='me-2' size={24} />
          <span>Be om hjälp</span>
        </Dropdown.Item>
        <Dropdown.Item className='d-flex align-items-center' href='#'>
          <RiFlagLine className='me-2' size={24} />
          <span>Rapportera fel</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CustomerEllipsis;
