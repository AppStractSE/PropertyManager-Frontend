import { useState } from "react";
import { Button } from "react-bootstrap";
import { AreaResponseDto } from "../../../../api/client";
import EditAreaModal from "../edit/EditAreaModal";

interface Props {
  area: AreaResponseDto;
}

const AreaRow = ({ area }: Props) => {
  const [areaModal, setShowAreaModal] = useState(false);
  return (
    <tr>
      <td>{area.name}</td>
      <td>
        <Button
          className='me-2'
          variant='outline-primary'
          size='sm'
          onClick={() => setShowAreaModal(!areaModal)}
        >
          Visa mer
        </Button>
      </td>
      <EditAreaModal area={area} show={areaModal} onHide={() => setShowAreaModal(!areaModal)} />
    </tr>
  );
};

export default AreaRow;
