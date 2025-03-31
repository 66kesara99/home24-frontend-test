import { Flex, Spin } from "antd";
import React from "react";

const LoadingSpinner: React.FC = () => (
  <Flex align="center" justify="center" style={{ height: "100%" }}>
    <Spin size="large" />
  </Flex>
);

export default LoadingSpinner;
