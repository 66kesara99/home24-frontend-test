import { App, Button, Flex } from "antd";
import Title from "antd/es/typography/Title";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { createProduct, getProducts } from "../../api/products";
import { Product } from "../../entities/product-entity";
import { CategoryContext } from "../../state/category-state/category-context";
import { LastModifiedContext } from "../../state/last-modified-state/last-modified-context";
import { CreateEditProductModal } from "./components/create-edit-product-modal";
import ProductList, { ProductTableData } from "./components/product-list";
import { getAllChildKeys } from "../../utils/tree-utils";

const ProductsPage: React.FC = () => {
  const { selectedCategory, categoryMap } = useContext(CategoryContext);
  const { setLastModifiedProduct } = useContext(LastModifiedContext);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { message } = App.useApp();

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<ProductTableData[]>([]);

  const onClickAdd = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const fetchData = useCallback(async () => {
    if (!selectedCategory) {
      return;
    }

    setIsLoading(true);

    const selectedCategories: number[] = getAllChildKeys(selectedCategory);

    try {
      const results = await getProducts({
        selectedCategories,
      });

      if (results) {
        setProducts(
          results.map((item) => ({
            id: item.id,
            name: item.name,
            categoryName: categoryMap[item.category_id],
            attributes: item.attributes,
          }))
        );
      }
    } catch (e) {
      message.error("Something went wrong!");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [categoryMap, message, selectedCategory]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onAddProductSubmit = async (product: Product) => {
    setIsLoading(true);

    try {
      const result = await createProduct(product);
      setLastModifiedProduct(result);
      await fetchData();
      setIsAddModalOpen(false);
    } catch (e) {
      console.error(e);
      message.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Flex vertical gap="middle">
        <Flex justify="space-between" align="center">
          <Title style={{ marginBottom: "0px" }} level={4}>
            Products
          </Title>
          <Button type="primary" onClick={onClickAdd}>
            Add Product
          </Button>
        </Flex>
        <ProductList products={products} isLoading={isLoading} />
      </Flex>

      <CreateEditProductModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onSubmit={onAddProductSubmit}
      />
    </>
  );
};

export default ProductsPage;
