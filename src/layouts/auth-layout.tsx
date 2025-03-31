import { Button, Layout } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { FooterComponent } from "../components/footer";
import { Logo } from "../components/logo";
import { checkAuthToken, removeAuthToken } from "../utils/auth-utils";

const { Header } = Layout;

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
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Logo />
        <Button onClick={handleLogout} type="primary">
          Logout
        </Button>
      </Header>
      {children}
      <FooterComponent />
    </Layout>
  );
};

export default AuthLayout;
