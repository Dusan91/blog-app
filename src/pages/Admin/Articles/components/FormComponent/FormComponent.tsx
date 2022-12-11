import { Button, Form, Input, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import {
  Article,
  CategoriesDataProps,
  Category,
  CreateEditArticle,
} from "../../../../../utils/commonInterfaces";

interface FormProps {
  editArticle: Article | null;
  categories: CategoriesDataProps | null;
  handleSubmit: (values: CreateEditArticle) => void;
  handleCancel: () => void;
}
const FormComponent: React.FC<FormProps> = ({
  handleSubmit,
  handleCancel,
  categories,
  editArticle,
}): React.ReactElement => {
  const [form] = Form.useForm();

  const resetForm = () => form.resetFields();

  useEffect(() => {
    if (editArticle) form.setFieldsValue(editArticle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editArticle]);

  const handleConfirm = (values: CreateEditArticle) => {
    handleSubmit(values);
    resetForm();
  };

  const handleDecline = () => {
    handleCancel();
    resetForm();
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      layout="horizontal"
      autoComplete="off"
      onFinish={handleConfirm}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          { required: true, message: "Please enter this field!" },
          { max: 255, message: "Please enter less than 255 characters!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Body"
        name="body"
        rules={[
          { required: true, message: "Please input this field!" },
          { max: 1000, message: "Please enter less than 1000 characters!" },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item
        label="Category"
        name="category_id"
        rules={[{ required: true, message: "Please select this field!" }]}
      >
        <Select>
          {categories?.data.map((category: Category, i: number) => (
            <Select.Option key={i} value={category.id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 16, span: 24 }}>
        <Space>
          <Button key="back" onClick={handleDecline}>
            Cancel
          </Button>
          <Button htmlType="submit" key="submit" type="primary">
            Submit
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
export default FormComponent;
