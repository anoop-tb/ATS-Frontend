import React from "react";
import { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import accion from "../../../accion.png";

import "./style.css";

const { Header } = Layout;

const Navbar = () => {
  const menuOption: MenuProps["items"] = [
    {
      key: "home",
      label: <Link to="/">Home</Link>,
    },
    {
      key: "prevSearch",
      label: <Link to="/previoussearchlist">Previous Search</Link>,
    },
  ];

  return (
    <Header
      style={{ position: "sticky", top: 0, zIndex: 1 }}
      className="header"
    >
      <img
        src={accion}
        style={{
          float: "left",
          width: 150,
          height: 31,
          margin: "16px 44px 16px 0",
        }}
      />
      {/* Uncomment below if you want the menu */}
      {/* <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['home']}
        style={{ lineHeight: '64px' }}
        items={menuOption}
      /> */}
    </Header>
  );
};

export default Navbar;
