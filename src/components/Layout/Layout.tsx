import React from "react";
import { Layout as AntdLayout } from "antd";
import { Outlet } from "react-router-dom";
import { ContentWrapper, FooterWrapper, LayoutContent } from "./styles";
import HeaderWrapper from "./components/HeaderWrapper";
import Breadcrumb from "./components/Breadcrumb";

const Layout: React.FC = (): React.ReactElement => {
  return (
    <AntdLayout className="layout">
      <HeaderWrapper />
      <ContentWrapper>
        <Breadcrumb />
        <LayoutContent>
          <Outlet />
        </LayoutContent>
      </ContentWrapper>
      <FooterWrapper>
        BRAME - blog app ©2022 Created by Dusan Milenkovic
      </FooterWrapper>
    </AntdLayout>
  );
};
export default Layout;
