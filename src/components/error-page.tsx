import { Button, Result } from "antd";
import React from "react";
import { NavLink } from "react-router";

const ErrorPage: React.FC = () => (
  <Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrong."
    extra={
      <NavLink to="/">
        <Button type="primary">Back Home</Button>
      </NavLink>
    }
  />
);

export default ErrorPage;
