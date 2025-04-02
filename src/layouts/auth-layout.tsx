import { Button, Layout } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { FooterComponent } from "../components/footer";
import { HeaderComponent } from "../components/header";
import { Logo } from "../components/logo";
import { checkAuthToken, removeAuthToken } from "../utils/auth-utils";

const { Content } = Layout;

interface Props {
  children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    removeAuthToken();
    navigate("/");
  };

  useEffect(() => {
    if (!checkAuthToken()) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Layout>
      <HeaderComponent>
        <Logo />
        <Button onClick={handleLogout} type="primary" size="large">
          Logout
        </Button>
      </HeaderComponent>
      <Content
        style={{
          background: "#f1ebe7",
        }}
      >
        {children}
      </Content>
      <FooterComponent />
    </Layout>
  );
};

export default AuthLayout;
