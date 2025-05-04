import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoStorefront } from "react-icons/io5";
import { MdOutlineSportsHandball } from "react-icons/md";
import { BsPersonGear } from "react-icons/bs";
// import { BiSolidCategoryAlt } from "react-icons/bi";

export const sideBarLinks = [
  {
    title: "Dashboard",
    link: "/dashboard",
    icon: <TbLayoutDashboardFilled />,
  },
  // {
  //   title: "Manage Categories",
  //   link: "/dashboard/main-categories",
  //   icon: <BiSolidCategoryAlt />,
  // },
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
  {
    title: "My Profile",
    link: "/dashboard/my-profile",
    icon: <BsPersonGear />,
  },
];
