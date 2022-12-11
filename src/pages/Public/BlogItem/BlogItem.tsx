import { Divider } from "antd";
import moment from "moment";
import React, { Suspense, useEffect } from "react";
import { useParams } from "react-router";
import { useArticle } from "../../../utils/useArticle";
import { useCategory } from "../../../utils/useCategory";
import API from "./api";
import { BlogBody, BlogWrapper, FlexEndContainer } from "./styles";

const LazyComments = React.lazy(() => import("./components/Comments"));
const LazyCategory = React.lazy(() => import("./components/Category"));

const BlogItem: React.FC = (): React.ReactElement => {
  const { id } = useParams();
  const { article, setArticle } = useArticle();
  const { category, setCategory } = useCategory();
  useEffect(() => {
    if (id) handleGetArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleGetArticle = async () => {
    const response = await API.getArticle(Number(id));
    if (response.status === 200 && response?.data?.data) {
      setArticle(response.data.data);
      handleGetArticleCategory(response.data.data.category_id);
    }
  };

  const handleGetArticleCategory = async (id: Number) => {
    const response = await API.getArticleCategory(Number(id));
    if (response.status === 200 && response?.data?.data)
      setCategory(response.data.data);
  };

  if (!article) return <h2>No data</h2>;
  return (
    <BlogWrapper>
      <Divider orientation="left">
        <h2>Blog: {article.title}</h2>
      </Divider>
      <FlexEndContainer>
        <em>Created: {moment(article.created_at).format("DD.MM.YYYY")}</em>
      </FlexEndContainer>
      <BlogBody>{article.body}</BlogBody>
      <Suspense fallback="Loading category ...">
        <LazyCategory category={category} />
      </Suspense>
      <Suspense fallback="Loading comments ...">
        <LazyComments id={Number(id)} />
      </Suspense>
    </BlogWrapper>
  );
};

export default BlogItem;
