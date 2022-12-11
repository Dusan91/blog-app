import { Layout as AndtLayout } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../Header";

export const LayoutContent = styled.div`
  min-height: 80vh;
  margin: 0 auto;
`;
export const Sider = styled(AndtLayout.Sider)`
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
`;
export const SiteName = styled.div`
  font-size: 18px;
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.2);
  justify-content: center;
  display: flex;
  align-items: center;
  color: #fff;
  background: #001628;
  font-weight: 600;
`;

export const Layout = styled(AndtLayout)`
  margin-left: 200;
`;
export const Content = styled(AndtLayout.Content)`
  margin: 24px 16px 0;
  overflow: initial;
  background: #f5f5f5;
`;
export const HeaderWrapper = styled(Header)`
  padding: 0;
  background-color: #fff !important;
  padding-right: 0 !important;
`;
export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90vh;
`;
export const HomeLink = styled(Link)`
  padding-left: 24px;
  color: #a6adb5;
  display: flex;
  align-items: center;
  &:hover {
    color: #fff;
  }
  span {
    margin-right: 10px;
  }
`;
