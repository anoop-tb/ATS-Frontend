import React from "react";
import { MenuProps, Popconfirm } from "antd";
import { Button, Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import accion from "../../../accion.png";
import { SettingOutlined, LogoutOutlined,HistoryOutlined } from '@ant-design/icons';
import "./style.css";

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();

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

  const SelectedMenu = (value: string) => {
    switch (value) {
      case "Home":
        return <Link to="/" />;
      case "Previous Search":
        return <Link to="/previoussearchlist" />;
      default:
        return <Link to="/login" />;
    }
  };

  const confirm = () => {
    Cookies.remove("atsUser");
    navigate("/login");
  };

  type MenuItem = Required<MenuProps>['items'][number];
  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem('Setting', 'sub1', <SettingOutlined />, [
      getItem(<span><HistoryOutlined/> Activity</span>),
      getItem(
        // <Popconfirm title="Sure to Logout?" onConfirm={confirm}>
        <span style={{background:"none"}} onClick={confirm}>
          <LogoutOutlined/> Logout
        </span>
        // </Popconfirm>
      ),
      // getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
  };

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
        alt={"Accionlabs"}
      />

      {/* <Popconfirm title="Sure to Logout?" onConfirm={confirm}>
        <Button type="primary" style={{ float: "right", marginTop: "15px" }}>
          Logout
        </Button>
      </Popconfirm> */}

      <Menu
        theme="dark"
        onClick={onClick}
        //  #001529
        style={{float: "right"}} mode="horizontal"
        items={items}
      />

      {/* <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['home']}
          style={{ lineHeight: '64px' }}
          items = {menuOption}
        /> */}
    </Header>
  );
};
export default Navbar;