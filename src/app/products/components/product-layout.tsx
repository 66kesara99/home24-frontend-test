import { MenuOutlined } from "@ant-design/icons";
import { Divider, Drawer, Flex, FloatButton, Grid, Layout, theme } from "antd";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";
import { Outlet } from "react-router";
import AuthLayout from "../../../layouts/auth-layout";
import { CategoryProvider } from "../../../state/category-state/category-provider";
import { LastModifiedProvider } from "../../../state/last-modified-state/last-modified-provider";
import CategoryTree from "./category-tree";
import { LastModifiedProduct } from "./last-modified-product";

const { Content, Sider } = Layout;
const { useBreakpoint } = Grid;

const ProductsLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const breakpoint = useBreakpoint();

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
            <Flex
              justify="space-between"
              vertical={!breakpoint.md}
              align="center"
            >
              <Title style={{ margin: "16px 0" }} level={2}>
                Product Dashboard
              </Title>

              <LastModifiedProduct />
            </Flex>

            <Layout
              style={{
                padding: "24px 0",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                minHeight: "90vh",
                marginBottom: "24px",
              }}
            >
              <Sider
                className="hide-on-mobile"
                style={{ background: colorBgContainer }}
                width={300}
              >
                <CategoryTree />
              </Sider>

              <Divider type="vertical" style={{ height: "unset" }} />

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
