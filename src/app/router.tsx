import { BrowserRouter, Route, Routes } from "react-router";
import NotFoundPage from "../components/not-found-page";
import ProductsLayout from "../layouts/product-layout";
import LoginPage from "./login/login";
import ProductDetailsPage from "./products/product-details";
import ProductsPage from "./products/products";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<LoginPage />} />

        <Route path="products" element={<ProductsLayout />}>
          <Route index element={<ProductsPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
