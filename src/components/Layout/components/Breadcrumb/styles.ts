import { Breadcrumb } from "antd";
import styled from "styled-components";

export const BreadcrumbWrapper = styled(Breadcrumb)`
  margin: 15px 0;
`;
export const BreadcrumbItem = styled(Breadcrumb.Item)<{ clickable?: number }>`
  cursor: ${(props) => (props.clickable ? "pointer" : "default")};
`;
