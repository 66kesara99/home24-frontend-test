import { Button, Result } from "antd";
import React from "react";
import { NavLink } from "react-router";

const NotFoundPage: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <NavLink to="/">
        <Button type="primary">Back Home</Button>
      </NavLink>
    }
  />
);

export default NotFoundPage;
