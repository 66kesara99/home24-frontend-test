import { MenuOutlined } from "@ant-design/icons";
import { Drawer, Flex, FloatButton, Layout, theme } from "antd";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";
import { Outlet } from "react-router";
import CategoryTree from "../components/category-tree";
import { LastModifiedProduct } from "../components/last-modified-product";
import { CategoryProvider } from "../state/category-state/category-provider";
import { LastModifiedProvider } from "../state/last-modified-state/last-modified-provider";
import AuthLayout from "./auth-layout";

const { Content, Sider } = Layout;

const ProductsLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [openDrawer, setOpenDrawer] = useState(false);

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const onClickDrawer = () => {
    setOpenDrawer(true);
  };

  return (
    <AuthLayout>
      <CategoryProvider>
        <LastModifiedProvider>
          <div style={{ padding: "0 26px" }}>
            <Flex justify="space-between" align="center">
              <Title level={3}>Product Dashboard</Title>

              <LastModifiedProduct />
            </Flex>

            <Layout
              style={{
                padding: "24px 0",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                minHeight: "90vh",
              }}
            >
              <Sider
                className="hide-on-mobile"
                style={{ background: colorBgContainer }}
                width={200}
              >
                <CategoryTree />
              </Sider>

              <FloatButton
                className="hide-on-desktop"
                onClick={onClickDrawer}
                icon={<MenuOutlined />}
              />
              <Drawer
                className="hide-on-desktop"
                placement="left"
                closable={true}
                onClose={onCloseDrawer}
                open={openDrawer}
              >
                <CategoryTree onClickNode={onCloseDrawer} />
              </Drawer>

              <Content style={{ padding: "0 24px", minHeight: 280 }}>
                <Outlet />
              </Content>
            </Layout>
          </div>
        </LastModifiedProvider>
      </CategoryProvider>
    </AuthLayout>
  );
};

export default ProductsLayout;
