import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./login/page";
import NotFoundPage from "./not-found-page";
import ProductsLayout from "./products/components/product-layout";
import ProductsPage from "./products/page";
import ProductDetailsPage from "./products/product-details/page";

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
