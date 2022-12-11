import { Divider } from "antd";
import { Category as CategoryProps } from "../../../../../utils/commonInterfaces";
import { BlogBody } from "../../styles";

const Category: React.FC<{ category: CategoryProps | null }> = ({
  category,
}): React.ReactElement => {
  if (!category) return <></>;
  return (
    <>
      <Divider orientation="left">
        <h3>Category: {category.name} </h3>
      </Divider>
      <BlogBody>{category.description}</BlogBody>
    </>
  );
};

export default Category;
