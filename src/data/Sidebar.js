import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";

const menu = [
  {
    title: "Tableau de bord",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Ajouter un produit",
    icon: <BiImageAdd />,
    path: "/add-product",
  },
  {
    title: "Compte",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Modifier le profile",
        path: "/edit-profile",
      },
    ],
  },
  // {
  //   title: "Report Bug",
  //   icon: <FaCommentAlt />,
  //   path: "/contact-us",
  // },
];

export default menu;
