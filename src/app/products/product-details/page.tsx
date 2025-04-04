import type { DescriptionsProps } from "antd";
import {
  App,
  Button,
  Descriptions,
  Flex,
  Grid,
  List,
  Radio,
  Tag,
  Typography,
} from "antd";
import Title from "antd/es/typography/Title";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProductById, updateProduct } from "../../../api/products";
import LoadingSpinner from "../../../components/loading-spinner";
import { AttributeType, Product } from "../../../entities/product-entity";
import { CategoryContext } from "../../../state/category-state/category-context";
import { LastModifiedContext } from "../../../state/last-modified-state/last-modified-context";
import { CreateEditProductModal } from "../components/create-edit-product-modal";

const { Text } = Typography;
const { useBreakpoint } = Grid;

const ProductDetailsPage: React.FC = () => {
  const params = useParams();
  const { productId } = params;
  const { categoryMap } = useContext(CategoryContext);
  const { setLastModifiedProduct } = useContext(LastModifiedContext);
  const { message } = App.useApp();
  const breakpoint = useBreakpoint();

  const [product, setProduct] = useState<Product | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const retrieveData = useCallback(async () => {
    if (!productId) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await getProductById(parseInt(productId));
      setProduct(result);
    } catch (e) {
      console.error(e);
      message.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [message, productId]);

  useEffect(() => {
    retrieveData();
  }, [retrieveData]);

  const onEditComplete = async (updatedProduct: Product) => {
    setIsLoading(true);

    try {
      const result = await updateProduct(updatedProduct);
      setLastModifiedProduct(result);
      setProduct(result);
      setIsEditModalOpen(false);
    } catch (e) {
      console.error(e);
      message.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const onClickEdit = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const getAttributeValueComponent = (type: AttributeType, value: any) => {
    switch (type) {
      case AttributeType.Url:
        return (
          <Button
            type="link"
            style={{
              justifySelf: "left",
              padding: "0px",
            }}
          >
            {value}
          </Button>
        );

      case AttributeType.Tags:
        return (
          <Flex wrap>
            {(value as string[]).map((tag) => (
              <Tag key={tag} color="blue">
                {tag}
              </Tag>
            ))}
          </Flex>
        );

      case AttributeType.Boolean:
        return (
          <Radio.Group
            options={[
              { label: "True", value: true },
              { label: "False", value: false },
            ]}
            value={value as boolean}
            optionType="button"
            buttonStyle="solid"
          />
        );

      case AttributeType.Text:
      case AttributeType.Number:
      default:
        return value;
    }
  };

  const items: DescriptionsProps["items"] = !product
    ? []
    : [
        {
          label: "Product Id",
          children: product.id,
          span: "filled",
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
            <List
              style={{ width: "100%" }}
              dataSource={product.attributes}
              renderItem={(item) => (
                <List.Item
                  style={{
                    display: "flex",
                    gap: "4px",
                    justifyContent: "left",
                  }}
                >
                  <Text type="secondary">{`${item.code}:`}</Text>
                  {getAttributeValueComponent(item.type, item.value)}
                </List.Item>
              )}
            />
          ),
        },
      ];

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Descriptions
          title={
            <Flex justify="space-between" align="center">
              <Title style={{ marginBottom: "0px" }} level={4}>
                Product Details
              </Title>

              <Button type="primary" onClick={onClickEdit}>
                Edit
              </Button>
            </Flex>
          }
          bordered
          items={items}
          layout={breakpoint.md ? "horizontal" : "vertical"}
        />
      )}
      <CreateEditProductModal
        product={product}
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSubmit={onEditComplete}
      />
    </>
  );
};

export default ProductDetailsPage;
