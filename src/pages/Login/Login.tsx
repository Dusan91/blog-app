import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { LoginContainer, LoginHeader, LoginWrapper } from "./styles";

const Login: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    localStorage.setItem(
      "user",
      "9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN"
    );
    navigate("/", { replace: true });
  };
  return (
    <LoginContainer>
      <LoginWrapper>
        <LoginHeader>
          BRAME - <small>blog app</small>
        </LoginHeader>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Email"
            name="username"
            rules={[
              { required: true, message: "Please enter your username!" },
              { type: "email", message: "Please enter your email address!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Button style={{ width: "100%" }} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </LoginWrapper>
    </LoginContainer>
  );
};

export default Login;
