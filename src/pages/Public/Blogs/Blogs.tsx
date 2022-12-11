import { Button, Col, Divider, Pagination } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Article } from "../../../utils/commonInterfaces";
import { useArticle } from "../../../utils/useArticle";
import API from "./api";
import {
  BlogBody,
  BlogHeader,
  BlogWrapper,
  FlexEndContainer,
  Header,
  PageWrapper,
  StyledRow,
} from "./styles";

const Blogs: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const { articles, setArticles } = useArticle();

  useEffect(() => {
    handleGetArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetArticles = async (page?: number) => {
    const response = await API.getArticles(page);
    if (response.status === 200 && response.data) setArticles(response.data);
  };
  const handleOnReadMore = (id: number) => () => navigate(`/blog/${id}`);
  return (
    <PageWrapper>
      <Divider orientation="center">
        <Header>Blogs</Header>
      </Divider>
      <StyledRow gutter={40}>
        {articles?.data.map((article: Article, index: number) => (
          <Col key={index} lg={12}>
            <BlogWrapper>
              <BlogHeader>{article.title}</BlogHeader>
              <FlexEndContainer>
                Created: {moment(article.created_at).format("DD.MM.YYYY")}
              </FlexEndContainer>
              <BlogBody>{article.body}</BlogBody>
              <FlexEndContainer>
                <Button onClick={handleOnReadMore(article.id)}>
                  Read more
                </Button>
              </FlexEndContainer>
            </BlogWrapper>
          </Col>
        ))}
      </StyledRow>
      {articles ? (
        <Pagination
          key={JSON.stringify(articles)}
          style={{ textAlign: "center" }}
          defaultCurrent={articles?.current_page}
          total={articles?.total}
          showSizeChanger={false}
          showQuickJumper
          onChange={handleGetArticles}
          showTotal={(total) => `Total ${total} items`}
        />
      ) : null}
    </PageWrapper>
  );
};

export default Blogs;
