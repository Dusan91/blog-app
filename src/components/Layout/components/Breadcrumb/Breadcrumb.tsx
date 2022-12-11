import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useArticle } from "../../../../utils/useArticle";
import { useCategory } from "../../../../utils/useCategory";
import { BreadcrumbItem, BreadcrumbWrapper } from "./styles";

const Breadcrumb: React.FC = (): React.ReactElement => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { article } = useArticle();
  const { category } = useCategory();
  const navigate = useNavigate();

  const handleNavigateHome = () => navigate("/");

  const handleNavigateCategory = () =>
    navigate(`/category/${category?.id}`, { state: category });

  return (
    <BreadcrumbWrapper>
      <BreadcrumbItem clickable={1} onClick={handleNavigateHome}>
        Home
      </BreadcrumbItem>
      {id ? (
        <>
          <BreadcrumbItem clickable={1} onClick={handleNavigateCategory}>
            {category?.name}
          </BreadcrumbItem>
          {pathname.includes("blog") ? (
            <BreadcrumbItem>{article?.title}</BreadcrumbItem>
          ) : null}
        </>
      ) : null}
    </BreadcrumbWrapper>
  );
};

export default Breadcrumb;
