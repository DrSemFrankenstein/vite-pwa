// MenuItems.js (or MenuItems.jsx)
import { Link } from "react-router-dom";
import { HomeOutlined, InfoCircleOutlined, BranchesOutlined, BugOutlined } from "@ant-design/icons";

const MenuItems = [
  {
    title: <Link to="/">Home</Link>,
    icon: <HomeOutlined />,
  },
  {
    title: <Link to="/about">About</Link>,
    icon: <InfoCircleOutlined />,
  },
  {
    title: <Link to="/reduxpage">Redux</Link>,
    icon: <BranchesOutlined />,
  },
  {
    title: <Link to="/test">Tester</Link>,
    icon: <BugOutlined />,
  },
];

export default MenuItems;
