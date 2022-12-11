import { Pagination as AntdPagination } from "antd";
import styled from "styled-components";

export const Footer = styled.div`
  background-color: #fff;
  padding: 10px 20px;
`;
export const Pagination = styled(AntdPagination)`
  text-align: right;
  margin: 10xp 0;
`;
export const Actions = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const IconButton = styled.button`
  border: none;
  background: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  font-size: 15px;
  &:hover {
    background: #fff;
  }
`;
