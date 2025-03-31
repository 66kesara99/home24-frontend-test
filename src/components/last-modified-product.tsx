import { FC, useContext } from "react";
import { NavLink } from "react-router";
import { LastModifiedContext } from "../state/last-modified-state/last-modified-context";

// Requested custom widget without using any UI elements from Ant Design
// Using inline styles for simplicity. But can use tailwindcss, styled components, css or any css processor for advanced styling
export const LastModifiedProduct: FC = () => {
  const { lastModifiedProduct } = useContext(LastModifiedContext);
  return (
    <div
      style={{
        margin: "8px",
        padding: "16px",
        backgroundColor: "#ffffff",
        color: "#000000",
        border: "1px solid #00000050",
        borderRadius: "8px",
        display: "flex",
        gap: "12px",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <h2
          style={{
            color: "#000000",
            backgroundColor: "#00000050",
            borderRadius: "20px",
            padding: "4px 8px",
            fontSize: "10px",
          }}
        >
          Last Modified
        </h2>
        <span
          style={{
            marginLeft: "10px",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {lastModifiedProduct?.name}
        </span>
      </div>
      <NavLink to={`/products/${lastModifiedProduct?.id}`}>
        <button
          style={{
            border: "1px solid #00000050",
            borderRadius: "4px",
            backgroundColor: "#ffffff",
            padding: "4px 8px",
          }}
        >
          View Product
        </button>
      </NavLink>
    </div>
  );
};
