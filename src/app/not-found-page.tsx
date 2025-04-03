import { Button, Layout, Result } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { NavLink } from "react-router";
import { FooterComponent } from "../components/footer";
import { HeaderComponent } from "../components/header";
import { Logo } from "../components/logo";

const NotFoundPage: React.FC = () => (
  <Layout>
    <HeaderComponent>
      <Logo />
    </HeaderComponent>
    <Content
      style={{
        background: "#f1ebe7",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <NavLink to="/" aria-label="Go to homepage">
            <Button type="primary">Back Home</Button>
          </NavLink>
        }
      />
    </Content>
    <FooterComponent />
  </Layout>
);

export default NotFoundPage;
