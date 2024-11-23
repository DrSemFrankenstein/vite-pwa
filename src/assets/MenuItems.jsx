// MenuItems.js (or MenuItems.jsx)
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  InfoCircleOutlined,
  BugOutlined,
  CarOutlined,
} from "@ant-design/icons";

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
    title: <Link to="/test">Tester</Link>,
    icon: <BugOutlined />,
  },
  {
    title: <Link to="/test2">Tester</Link>,
    icon: <BugOutlined />,
  },
  {
    title: <Link to="/carplay">CarPlay</Link>,
    icon: <CarOutlined />,
  },
];

export default MenuItems;
