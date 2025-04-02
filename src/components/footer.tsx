import { Layout } from "antd";

const { Footer } = Layout;

export const FooterComponent = () => {
  return (
    <a href="https://66kesara99.github.io/">
      <Footer
        style={{ textAlign: "center", background: "#000000", color: "#ffffff" }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Kesara Gamlath
      </Footer>
    </a>
  );
};
