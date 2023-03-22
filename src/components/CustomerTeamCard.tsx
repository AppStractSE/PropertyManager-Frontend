import { useQuery } from "react-query";
import { AreaResponseDto, TeamResponseDto } from "../api/client";
import { useClient } from "../contexts/ClientContext";

const CustomerTeamCard = ({ customer }: any) => {
  const client = useClient();

  const { data: area } = useQuery<AreaResponseDto>(["area", customer.areaId], async () =>
    client.area_GetAreaById(customer.areaId!),
  );

  const { data: team } = useQuery<TeamResponseDto>(["team", customer.teamId], async () =>
    client.team_GetTeamById(customer.teamId!),
  );

  return (
    <div>
      {customer.name} - {team?.name} - {area?.name}
    </div>
  );
};

export default CustomerTeamCard;
