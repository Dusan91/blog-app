import { Row } from "antd";
import styled from "styled-components";

export const PageWrapper = styled.div`
  padding: 20px;
`;
export const BlogHeader = styled.h2`
  min-height: 50px;
`;
export const FlexEndContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #949191;
  margin-right: 10px;
  font-style: italic;
`;
export const BlogBody = styled.p`
  min-height: 180px;
  color: #868686;
`;
export const BlogWrapper = styled.article`
  border: 1px solid lightgray;
  padding: 20px;
  box-shadow: 0 0 9px -3px grey;
  margin: 20px 0;
  background-color: #fff;
`;
export const Header = styled.h1`
  text-align: center;
  font-size: 36px;
`;
export const StyledRow = styled(Row)`
  justify-content: center;
`;
