import { Button as AntdButton } from "antd";
import styled from "styled-components";

const Button = styled(AntdButton)<{ admin?: number }>`
  ${(props) => props.admin && "margin-right:20px;"}
  color: #fff;
  background-color: #001529;
  border: none;
`;

export default Button;
