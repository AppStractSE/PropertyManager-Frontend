import { useQuery } from "react-query";
import { AreaResponseDto, TeamResponseDto } from "../api/client";
import useAxios from "../hooks/useAxios";
import { Area } from "../models/Area";
import { Team } from "../models/Team";

const CustomerTeamCard = ({ customer }: any) => {
  const fetchAreaById = useAxios({
    url: `/area/GetAreaById?Id=${customer.areaId}`,
    method: "get",
  });
  const fetchTeamById = useAxios({
    url: `/team/GetTeamById?Id=${customer.teamId}`,
    method: "get",
  });
  const {
    data: areaById,
    error: areaByIdError,
    isLoading: areaByIdLoading,
  } = useQuery<AreaResponseDto>(customer.areaId, fetchAreaById);

  const {
    data: teamById,
    error: teamByIdError,
    isLoading: teamByIdLoading,
  } = useQuery<TeamResponseDto>(customer.id, fetchTeamById);

  return (
    <div>
      {customer.name} - {teamById?.name} - {areaById?.name}
    </div>
  );
};

export default CustomerTeamCard;
