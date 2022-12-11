import { Button, Form, Input, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import {
  CategoriesDataProps,
  Category,
  CreateEditCategory,
} from "../../../../../utils/commonInterfaces";

interface FormProps {
  editCategory: Category | null;
  categories: CategoriesDataProps | null;
  handleSubmit: (values: CreateEditCategory) => void;
  handleCancel: () => void;
}
const FormComponent: React.FC<FormProps> = ({
  handleSubmit,
  handleCancel,
  categories,
  editCategory,
}): React.ReactElement => {
  const [form] = Form.useForm();

  const resetForm = () => form.resetFields();

  useEffect(() => {
    if (editCategory) form.setFieldsValue(editCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editCategory]);

  const handleConfirm = (values: CreateEditCategory) => {
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
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 19 }}
      layout="horizontal"
      autoComplete="off"
      onFinish={handleConfirm}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          { required: true, message: "Please input this field!" },
          { max: 255, message: "Please enter less than 255 characters!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: "Please input this field!" },
          { max: 512, message: "Please enter less than 512 characters!" },
        ]}
      >
        <TextArea rows={4} />
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
