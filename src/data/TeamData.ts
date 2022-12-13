import { Team } from "../models/Team";
import CustomerData from "./CustomerData";
import UserData from "./UserData";
const TeamData: Team[] = [
  {
    id: "1",
    name: "Team A",
    members: [...UserData],
    customer: [...CustomerData],
  },
];

export default TeamData;
