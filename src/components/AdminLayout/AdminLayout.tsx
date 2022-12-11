import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  HomeOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, MenuProps } from "antd";
import { Menu } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Button from "../Button";
import {
  Content,
  HeaderWrapper,
  HomeLink,
  LayoutContent,
  MenuWrapper,
  Sider,
  SiteName,
} from "./styles";

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.includes("categories")) setActiveItem(2);
  }, [location.pathname]);

  const handleOnMenuItemClick = (item: number, path: string) => () => {
    setActiveItem(item);
    navigate(`${path}`);
  };
  const items: MenuProps["items"] = [
    {
      key: 1,
      icon: <AppstoreOutlined />,
      label: `Articles`,
      onClick: handleOnMenuItemClick(1, ""),
    },
    {
      key: 2,
      icon: <MenuUnfoldOutlined />,
      label: `Categories`,
      onClick: handleOnMenuItemClick(2, "categories"),
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <Layout hasSider>
      <Sider>
        <SiteName>Brame - admin app</SiteName>
        <MenuWrapper>
          <Menu
            key={String(activeItem)}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[String(activeItem)]}
            items={items}
          />
          <HomeLink to="/">
            <HomeOutlined /> Home
          </HomeLink>
        </MenuWrapper>
      </Sider>
      <Layout className="site-layout">
        <HeaderWrapper>
          <span />
          <Button admin={1} onClick={handleLogout}>
            Logout
          </Button>
        </HeaderWrapper>
        <Content>
          <LayoutContent>
            <Outlet />
          </LayoutContent>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
