// DrawerMenu.js
import React, { useState } from "react";
import { Drawer, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import MenuItems from "../assets/MenuItems";

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
          {MenuItems.map((item, index) => (
            <Menu.Item key={index} icon={item.icon} onClick={closeDrawer}>
              {item.title}
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>
    </>
  );
};

export default DrawerMenu;
