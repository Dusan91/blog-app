import { Divider } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import API from "./api";
import {
  CommentDesc,
  CommentHeader,
  CommentItem,
  CommentsWrapper,
  CreatedAt,
} from "./styles";

interface Comment {
  article_id: number;
  created_at: string;
  description: string;
  id: number;
  title: string;
  updated_at: string;
  user_id: number;
}

const Comments: React.FC<{ id: number }> = ({ id }): React.ReactElement => {
  const [articleComments, setArticleComments] = useState<Comment[]>([]);
  useEffect(() => {
    handleGetArticleComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetArticleComments = async () => {
    const response = await API.getArticleComments(Number(id));
    if (response.status === 200) setArticleComments(response.data.data);
  };
  return (
    <CommentsWrapper>
      <Divider orientation="left">
        <h3>Comments</h3>
      </Divider>
      {articleComments.length
        ? articleComments.map((comment: Comment, index: number) => (
            <CommentItem key={index}>
              <CommentHeader>{comment.title}</CommentHeader>
              <CreatedAt>
                Created: {moment(comment.created_at).format("DD.MM.YYYY")}
              </CreatedAt>
              <CommentDesc>{comment.description}</CommentDesc>
            </CommentItem>
          ))
        : null}
    </CommentsWrapper>
  );
};

export default Comments;
