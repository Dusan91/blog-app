import { Button, message, Modal } from "antd";
import { useEffect, useState } from "react";
import API from "./api";
import { Header, HeaderWrapper } from "./styles";
import { useArticle } from "../../../utils/useArticle";
import { useCategory } from "../../../utils/useCategory";
import TableComponent from "./components/TableComponent";
import FormComponent from "./components/FormComponent";
import { Article, CreateEditArticle } from "../../../utils/commonInterfaces";
import HandleAsync from "../../../utils/handleAsync";

const Articles: React.FC = (): React.ReactElement => {
  const { articles, setArticles } = useArticle();
  const { categories, setCategories } = useCategory();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDeleteModal, setDeleteOpenModal] = useState<boolean>(false);
  const [editArticle, setEditArticle] = useState<Article | null>(null);
  const [deleteArticleId, setDeleteArticleId] = useState<number>(0);
  useEffect(() => {
    if (!articles) handleGetArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!categories && openModal) handleGetCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);

  const handleGetArticles = async (page?: number) => {
    const response = await API.getArticles(page);
    if (response.status === 200 && response.data) setArticles(response.data);
  };

  const handleGetCategories = async () => {
    const response = await API.getCategories();
    if (response.status === 200 && response?.data) setCategories(response.data);
  };

  const handleSubmit = async (values: CreateEditArticle) => {
    const response = await HandleAsync(
      API.saveArticle(values, editArticle?.id)
    );
    if (response === "success") {
      toggleModal();
      message.success(
        `You have successfully ${
          editArticle ? "edited the" : "created an"
        } article`
      );
      handleGetArticles();
    }
  };

  const handleSetEditArticle = (data: Article) => () => {
    setEditArticle(data);
    toggleModal();
  };
  const handleCancel = () => {
    toggleModal();
    setEditArticle(null);
  };
  const handleSetDeleteArticleId = (data: Article) => () => {
    setDeleteArticleId(data?.id);
    toggleAreYouSureModal();
  };

  const handleConfirmDelete = async () => {
    const response = await HandleAsync(API.deleteArticle(deleteArticleId));
    if (response === "success") {
      message.success(`You have successfully deleted article`);
      setDeleteArticleId(0);
      toggleAreYouSureModal();
      handleGetArticles();
    }
  };
  const handleDeclineDelete = () => {
    setDeleteArticleId(0);
    toggleAreYouSureModal();
  };
  const toggleModal = () => setOpenModal((state) => !state);
  const toggleAreYouSureModal = () => setDeleteOpenModal((state) => !state);
  return (
    <>
      <HeaderWrapper>
        <Header>Articles</Header>
        <Button type="primary" onClick={toggleModal}>
          Add Article
        </Button>
      </HeaderWrapper>
      <TableComponent
        data={articles}
        handleEdit={handleSetEditArticle}
        handleDelete={handleSetDeleteArticleId}
        callback={handleGetArticles}
      />
      <Modal
        open={openModal}
        title={`${editArticle ? "Edit" : "Add"} Article`}
        onCancel={toggleModal}
        footer={[]}
      >
        <FormComponent
          editArticle={editArticle}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          categories={categories}
        />
      </Modal>
      <Modal
        open={openDeleteModal}
        title={`Are you sure you want to delete this article?`}
        onCancel={toggleAreYouSureModal}
        footer={[
          <Button key="back" onClick={handleDeclineDelete}>
            Cancel
          </Button>,
          <Button onClick={handleConfirmDelete} key="submit" type="primary">
            Delete
          </Button>,
        ]}
      ></Modal>
    </>
  );
};

export default Articles;
