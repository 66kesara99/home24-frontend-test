import { App } from "antd";
import { createRoot } from "react-dom/client";
import Router from "./app/router.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <App>
    <Router />
  </App>
  // </StrictMode>
);
