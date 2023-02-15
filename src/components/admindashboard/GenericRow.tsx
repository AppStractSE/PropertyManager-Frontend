import {
  ChoreResponseDto,
  CustomerResponseDto,
  TeamMemberResponseDto,
  TeamResponseDto,
  UserInfoDto,
} from "../../api/client";

interface Props {
  chores?: ChoreResponseDto[];
  customers?: CustomerResponseDto[];
  teams?: TeamResponseDto[];
  teammembers?: TeamMemberResponseDto[];
  users?: UserInfoDto[];
}

const GenericRow = ({chores, customers, teams, teammembers, users}: Props) => {
  return <div>GenericRow</div>;
};

export default GenericRow;
