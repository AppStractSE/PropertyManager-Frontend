import { Table } from "react-bootstrap";
import {
  ChoreResponseDto,
  CustomerResponseDto,
  TeamMemberResponseDto,
  TeamResponseDto,
  UserInfoDto,
} from "../../api/client";
import GenericRow from "./GenericRow";

interface Props {
  chores?: ChoreResponseDto[];
  customers?: CustomerResponseDto[];
  teams?: TeamResponseDto[];
  teammembers?: TeamMemberResponseDto[];
  users?: UserInfoDto[];
  title: string;
  tableHeaders: string[];
}

const GenericTable = ({
  chores,
  customers,
  teams,
  teammembers,
  users,
  tableHeaders,
  title,
}: Props) => {
  return (
    <>
      <div className='fs-4 mb-2'>{title}</div>
      <Table hover>
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th style={{ textTransform: "uppercase", fontSize: 12 }}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {customers?.map((customer) => (
            <tr>
              <GenericRow
                chores={chores}
                customers={customers}
                teams={teams}
                teammembers={teammembers}
                users={users}
              />
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default GenericTable;
