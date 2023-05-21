import { AiOutlineHome, AiOutlinePlus, AiOutlineTeam } from "react-icons/ai";
import { IoBriefcaseOutline } from "react-icons/io5";
import { RiTodoLine } from "react-icons/ri";
const dashboardData = [
  {
    name: "Översikt",
    icon: AiOutlineHome,
    link: "/",
  },
  {
    name: "Kunder",
    icon: IoBriefcaseOutline,
    link: "customer",
  },
  {
    name: "Teams",
    icon: AiOutlineTeam,
    link: "teams",
  },
  {
    name: "Sysslor",
    icon: RiTodoLine,
    link: "chores",
  },
  {
    name: "Skapa",
    icon: AiOutlinePlus,
    link: "create",
  },
];

export default dashboardData;
