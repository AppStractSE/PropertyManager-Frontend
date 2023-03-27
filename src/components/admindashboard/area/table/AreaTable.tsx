import { Table } from "react-bootstrap";
import { AreaResponseDto } from "../../../../api/client";
import AreaRow from "./AreaRow";

interface Props {
  search: string;
  areas: AreaResponseDto[];
}

const AreaTable = ({ areas, search }: Props) => {
  return (
    <Table hover striped>
      <thead>
        <tr>
          <th className='text-uppercase fs-7'>Områdesnamn</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {areas
          ?.filter((area) => area.name?.toLowerCase().includes(search.toLowerCase()))
          .map((area) => (
            <AreaRow key={area.id} area={area} />
          ))}
      </tbody>
    </Table>
  );
};

export default AreaTable;
