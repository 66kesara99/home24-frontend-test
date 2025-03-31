import type { DescriptionsProps } from "antd";
import { App, Descriptions } from "antd";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProductById } from "../../api/products";
import { EditableAttributes } from "../../components/editable-attributes";
import LoadingSpinner from "../../components/loading-spinner";
import { Product } from "../../entities/product-entity";
import { CategoryContext } from "../../state/category-state/category-context";

const ProductDetailsPage: React.FC = () => {
  const params = useParams();
  const { productId } = params;
  const { categoryMap } = useContext(CategoryContext);

  const { message } = App.useApp();

  const [product, setProduct] = useState<Product | undefined>();
  const [loading, setLoading] = useState(true);

  const retrieveData = useCallback(async () => {
    if (!productId) {
      return;
    }

    setLoading(true);

    try {
      const result = await getProductById(parseInt(productId));
      setProduct(result);
    } catch (e) {
      console.error(e);
      message.error("Something went wrong!");
    }

    setLoading(false);
  }, [message, productId]);

  useEffect(() => {
    retrieveData();
  }, [retrieveData]);

  const onEditComplete = () => {
    retrieveData();
  };

  const items: DescriptionsProps["items"] = !product
    ? []
    : [
        {
          label: "Product Id",
          children: product.id,
        },
        {
          label: "Name",
          children: product.name,
          span: "filled",
        },
        {
          label: "Category",
          children: categoryMap[product.category_id],
          span: "filled",
        },
        {
          label: "Attributes",
          span: "filled",
          children: (
            <EditableAttributes
              product={product}
              onEditComplete={onEditComplete}
            />
          ),
        },
      ];

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Descriptions
          title="Product Details"
          bordered
          column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
          items={items}
        />
      )}
    </>
  );
};

export default ProductDetailsPage;
