import styled from "styled-components";
import { Layout as AntdLayout } from "antd";
const { Content, Footer } = AntdLayout;

export const LayoutContent = styled.div`
  min-height: 80vh;
  width: 80%;
  margin: 0 auto;
`;
export const ContentWrapper = styled(Content)`
  padding: 0 50px;
`;

export const FooterWrapper = styled(Footer)`
  text-align: center;
`;
