import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoStorefront } from "react-icons/io5";
import { MdOutlineSportsHandball } from "react-icons/md";

export const sideBarLinks = [
  {
    title: "Dashboard",
    link: "/dashboard",
    icon: <TbLayoutDashboardFilled />,
  },
  {
    title: "Manage Stores",
    link: "/dashboard/stores",
    icon: <IoStorefront />,
  },
  {
    title: "Manage Playgrounds",
    link: "/dashboard/playgrounds",
    icon: <MdOutlineSportsHandball />,
  },
];
