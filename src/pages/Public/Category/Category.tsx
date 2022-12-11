import { Divider } from "antd";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { CategoryBody, CategoryWrapper, FlexEndContainer } from "./styles";

const Category: React.FC = (): React.ReactElement => {
  const { state } = useLocation();
  if (!state) return <></>;
  return (
    <CategoryWrapper>
      <Divider orientation="left">
        <h2>Category: {state.name}</h2>
      </Divider>
      <FlexEndContainer>
        <em>Created: {moment(state.created_at).format("DD.MM.YYYY")}</em>
      </FlexEndContainer>
      <CategoryBody>{state.description}</CategoryBody>
    </CategoryWrapper>
  );
};

export default Category;
