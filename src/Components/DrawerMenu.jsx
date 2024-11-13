import React, { useState } from "react";
import { Drawer, Menu } from "antd";
import {
  HomeOutlined,
  InfoCircleOutlined,
  BranchesOutlined,
  MenuOutlined,
  BugOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const DrawerMenu = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  return (
    <>
      <button
        onClick={showDrawer}
        style={{ background: "transparent", border: "none", fontSize: "16px" }}
      >
        <MenuOutlined />
      </button>
      <Drawer
        title="Menu"
        placement="left"
        onClose={closeDrawer}
        visible={visible}
        width={250}
      >
        <Menu
          mode="vertical"
          defaultSelectedKeys={["/"]}
          style={{ borderRight: 0 }}
        >
          <Menu.Item key="/" icon={<HomeOutlined />} onClick={closeDrawer}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item
            key="/about"
            icon={<InfoCircleOutlined />}
            onClick={closeDrawer}
          >
            <Link to="/about">About</Link>
          </Menu.Item>
          {/* <Menu.Item
            key="/reduxpage"
            icon={<BranchesOutlined />}
            onClick={closeDrawer}
          >
            <Link to="/reduxpage">Redux</Link>
          </Menu.Item> */}
          <Menu.Item key="/test" icon={<BugOutlined />} onClick={closeDrawer}>
            <Link to="/test">Tester</Link>
          </Menu.Item>
          <Menu.Item key="/test2" icon={<BugOutlined />} onClick={closeDrawer}>
            <Link to="/test2">Tester2</Link>
          </Menu.Item>
        </Menu>
      </Drawer>
    </>
  );
};

export default DrawerMenu;
