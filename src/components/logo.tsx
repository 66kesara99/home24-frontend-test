import { NavLink } from "react-router";
import logo from "../assets/logo.png";

export const Logo = () => {
  return (
    <NavLink to="/" style={{ display: "flex" }}>
      <img width={75} src={logo} />
    </NavLink>
  );
};
