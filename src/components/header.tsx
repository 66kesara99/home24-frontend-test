import { Layout } from "antd";
import { FC, ReactNode } from "react";

const { Header } = Layout;

interface Props {
  children: ReactNode;
}

export const HeaderComponent: FC<Props> = ({ children }) => {
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "80px",
        background: "#000000",
      }}
    >
      {children}
    </Header>
  );
};
