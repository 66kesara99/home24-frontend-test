import { FC, useContext } from "react";
import { NavLink } from "react-router";
import { LastModifiedContext } from "../../../state/last-modified-state/last-modified-context";

// Requested custom widget without using any UI elements from Ant Design
// Using inline styles for simplicity. But can use tailwindcss, styled components, css or any css processor for advanced styling
export const LastModifiedProduct: FC = () => {
  const { lastModifiedProduct } = useContext(LastModifiedContext);
  return (
    <div
      style={{
        margin: "12px 0",
        padding: "12px",
        display: "flex",
        gap: "12px",
        alignItems: "center",
        minWidth: "300px",
        background:
          "linear-gradient(180deg, rgba(200, 200, 200, 0.8), rgba(255, 255, 255, 0.8))",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <span
          style={{
            color: "#ffffff",
            background: "#000000",
            borderRadius: "20px",
            padding: "2px 10px",
            fontSize: "10px",
            alignSelf: "flex-end",
          }}
        >
          Last Modified
        </span>
        <span
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            margin: "0 16px",
          }}
        >
          {lastModifiedProduct?.name}
        </span>
        <NavLink to={`/products/${lastModifiedProduct?.id}`}>
          <button
            style={{
              border: "1px solid rgba(0, 232, 248, 0.40)",
              borderRadius: "8px",
              background:
                "linear-gradient(135deg, rgb(6, 101, 204),rgb(3, 171, 255)",
              color: "#ffffff",
              padding: "8px 12px",
              margin: "8px 16px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.15)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "8px",
              }}
            >
              <span>View Product</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
                width="16px"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
          </button>
        </NavLink>
      </div>
    </div>
  );
};
