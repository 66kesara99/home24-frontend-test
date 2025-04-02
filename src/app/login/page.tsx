import type { FormProps } from "antd";
import {
  App,
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  Grid,
  Input,
  Layout,
} from "antd";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../../api/user";
import { FooterComponent } from "../../components/footer";
import { HeaderComponent } from "../../components/header";
import { Logo } from "../../components/logo";
import { checkAuthToken, saveAuthToken } from "../../utils/auth-utils";

const { useBreakpoint } = Grid;

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const breakpoints = useBreakpoint();

  const [isLoading, setIsLoading] = useState(false);
  const { message } = App.useApp();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setIsLoading(true);

    try {
      const token = await login(values.email, values.password);

      if (token) {
        saveAuthToken(token);
        navigate("/products");
      } else {
        message.error("Email or Password is wrong!");
      }
    } catch (e) {
      message.error("Something went wrong!");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (checkAuthToken()) {
      navigate("/products");
    }
  }, [navigate]);

  return (
    <Layout>
      <HeaderComponent>
        <Logo />
      </HeaderComponent>
      <Content
        style={{
          background: "#f1ebe7",
        }}
      >
        <Flex
          vertical
          justify="center"
          align="center"
          style={{ minHeight: "90vh" }}
        >
          <Card
            hoverable
            title={
              <Flex
                justify="center"
                align="center"
                gap="small"
                style={{ padding: "16px" }}
              >
                <Logo />
                <Title
                  level={3}
                  style={{ marginBottom: "0px", textAlign: "center" }}
                >
                  Login
                </Title>
              </Flex>
            }
            variant="borderless"
            style={{ width: breakpoints.md ? 400 : 350 }}
          >
            <Form
              name="basic"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
              size={breakpoints.md ? "large" : "middle"}
            >
              <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item<FieldType>
                name="remember"
                valuePropName="checked"
                label={null}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item label={null} style={{ justifyItems: "center" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  style={{ padding: "0 48px" }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Flex>
      </Content>
      <FooterComponent />
    </Layout>
  );
};

export default LoginPage;
