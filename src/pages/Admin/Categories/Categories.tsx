import { Button, message, Modal } from "antd";
import { useEffect, useState } from "react";
import API from "./api";
import { Header, HeaderWrapper } from "./styles";
import { useCategory } from "../../../utils/useCategory";
import TableComponent from "./components/TableComponent";
import FormComponent from "./components/FormComponent";
import { Category, CreateEditCategory } from "../../../utils/commonInterfaces";
import HandleAsync from "../../../utils/handleAsync";

const Categories: React.FC = (): React.ReactElement => {
  const { categories, setCategories } = useCategory();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDeleteModal, setDeleteOpenModal] = useState<boolean>(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [deleteCategoryId, setDeleteCategoryId] = useState<number>(0);
  useEffect(() => {
    if (!categories) handleGetCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!categories && openModal) handleGetCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);

  const handleGetCategories = async (page?: number) => {
    const response = await API.getCategories(page);
    if (response.status === 200 && response.data) setCategories(response.data);
  };

  const handleSubmit = async (values: CreateEditCategory) => {
    const response = await HandleAsync(
      API.saveCategory(values, editCategory?.id)
    );
    if (response === "success") {
      toggleModal();
      message.success(
        `You have successfully ${
          editCategory ? "edited the" : "created a"
        } category`
      );
      handleGetCategories();
    }
  };

  const handleSetEditCategory = (data: Category) => () => {
    setEditCategory(data);
    toggleModal();
  };
  const handleCancel = () => {
    toggleModal();
    setEditCategory(null);
  };
  const handleSetDeleteCategoryId = (data: Category) => () => {
    setDeleteCategoryId(data?.id);
    toggleAreYouSureModal();
  };

  const handleConfirmDelete = async () => {
    const response = await HandleAsync(API.deleteCategory(deleteCategoryId));
    if (response === "success") {
      message.success(`You have successfully deleted category`);
      setDeleteCategoryId(0);
      toggleAreYouSureModal();
      handleGetCategories();
    }
  };
  const handleDeclineDelete = () => {
    setDeleteCategoryId(0);
    toggleAreYouSureModal();
  };
  const toggleModal = () => setOpenModal((state) => !state);
  const toggleAreYouSureModal = () => setDeleteOpenModal((state) => !state);
  return (
    <>
      <HeaderWrapper>
        <Header>Categories</Header>
        <Button type="primary" onClick={toggleModal}>
          Add Category
        </Button>
      </HeaderWrapper>
      <TableComponent
        data={categories}
        handleEdit={handleSetEditCategory}
        handleDelete={handleSetDeleteCategoryId}
        callback={handleGetCategories}
      />
      <Modal
        open={openModal}
        title={`${editCategory ? "Edit" : "Add"} Category`}
        onCancel={toggleModal}
        footer={[]}
      >
        <FormComponent
          editCategory={editCategory}
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

export default Categories;
