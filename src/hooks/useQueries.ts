import { useQuery } from "react-query";
import {
  AreaResponseDto,
  CategoryResponseDto,
  ChoreCommentResponseDto,
  ChoreResponseDto,
  ChoreStatusResponseDto,
  CityResponseDto,
  CustomerChoreResponseDto,
  CustomerResponseDto,
  Periodic,
  TeamMemberResponseDto,
  TeamResponseDto,
  UserDataResponseDto,
  UserInfoDto,
} from "../api/client";
import { useClient } from "../contexts/ClientContext";
import { useUser } from "../contexts/UserContext";

export function useQueries() {
  const client = useClient();
  const { currentUser } = useUser();

  const { data: userData } = useQuery<UserDataResponseDto>(
    ["userData", currentUser?.user?.userId],
    async () => client.userData_GetUserDataById(currentUser?.user?.userId || ""),
  );
  const { data: customers } = useQuery<CustomerResponseDto[]>(
    "customers",
    async () => await client.customer_GetAllCustomers(),
  );

  if (currentUser.user?.role === "Admin") {
    const { data: areas } = useQuery<AreaResponseDto[]>(
      ["areas"],
      async () => await client.area_GetAllAreas(),
    );

    const { data: categories } = useQuery<CategoryResponseDto[]>(["categories"], async () =>
      client.category_GetAllCategories(),
    );

    const { data: cities } = useQuery<CityResponseDto[]>(
      ["cities"],
      async () => await client.city_GetAllCities(),
    );

    const { data: choreComments } = useQuery<ChoreCommentResponseDto[]>(
      ["chorecomments"],
      async () => client.choreComment_GetAllChoreComments(),
    );

    const { data: choreStatuses } = useQuery<ChoreStatusResponseDto[]>("choreStatuses", async () =>
      client.choreStatus_GetAllChoreStatuses(),
    );

    const { data: chores } = useQuery<ChoreResponseDto[]>(
      "chores",
      async () => await client.chore_GetAllChores(),
    );

    const { data: customerchores } = useQuery<CustomerChoreResponseDto[]>(
      "customerchores",
      async () => client.customerChore_GetAllChores(),
    );

    const { data: periodics } = useQuery<Periodic[]>(
      "periodics",
      async () => await client.periodic_GetAllPeriodics(),
    );

    const { data: teamMembers } = useQuery<TeamMemberResponseDto[]>("teamMembers", async () =>
      client.teamMember_GetAllTeamMembers(),
    );

    const { data: teams } = useQuery<TeamResponseDto[]>(
      "teams",
      async () => await client.team_GetAllTeams(),
    );

    const { data: users } = useQuery<UserInfoDto[]>("users", async () =>
      client.authenticate_GetAllUsers(),
    );
    return {
      areas,
      categories,
      cities,
      choreComments,
      choreStatuses,
      chores,
      customers,
      customerchores,
      periodics,
      teamMembers,
      teams,
      users,
      userData,
    };
  }

  return {
    userData,
    customers,
  };
}
