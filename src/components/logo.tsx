import { NavLink } from "react-router";
import logo from "../assets/logo.png";

export const Logo = () => {
  return (
    <NavLink to="/" style={{ display: "flex" }} aria-label="Go to homepage">
      <img width={75} src={logo} alt="logo" />
    </NavLink>
  );
};
