import { Table } from "react-bootstrap";
import { AreaResponseDto } from "../../../../api/client";
import EditAreaRow from "./EditAreaRow";

interface Props {
  area: AreaResponseDto;
}

const EditAreaTable = ({ area }: Props) => {
  return (
    <Table hover striped className='mt-3'>
      <thead>
        <tr>
          <th className='text-uppercase fs-7'>Namn</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <EditAreaRow area={area} />
      </tbody>
    </Table>
  );
};

export default EditAreaTable;
