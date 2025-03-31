import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  App,
  Button,
  Card,
  Flex,
  Form,
  Input,
  List,
  Space,
  Typography,
} from "antd";
import { FC, useContext, useState } from "react";
import { updateProduct } from "../api/products";
import { Product } from "../entities/product-entity";
import { LastModifiedContext } from "../state/last-modified-state/last-modified-context";

const { Text } = Typography;

interface Props {
  product: Product;
  onEditComplete: () => void;
}

export const EditableAttributes: FC<Props> = ({ product, onEditComplete }) => {
  const { setLastModifiedProduct } = useContext(LastModifiedContext);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { message } = App.useApp();

  const onClickEditButton = () => {
    setEditMode(true);
  };
  const onClickCancelEdit = () => {
    setEditMode(false);
  };

  const onFinish = async (values: any) => {
    setIsLoading(true);

    try {
      const result = await updateProduct({
        ...product,
        attributes: values.attributes,
      });
      setLastModifiedProduct(result);
      onEditComplete();

      setEditMode(false);
    } catch (e) {
      console.error(e);
      message.error("Something went wrong!");
    }
    setIsLoading(false);
  };

  return editMode ? (
    <Form
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      autoComplete="off"
    >
      <Form.List name="attributes" initialValue={product.attributes}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "code"]}
                  rules={[{ required: true, message: "Missing code" }]}
                >
                  <Input placeholder="Code" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "value"]}
                  rules={[{ required: true, message: "Missing value" }]}
                >
                  <Input placeholder="Value" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Flex gap="small">
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
          <Button onClick={onClickCancelEdit}>Cancel</Button>
        </Flex>
      </Form.Item>
    </Form>
  ) : (
    <Flex vertical gap="middle">
      <List
        style={{ width: "100%" }}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        dataSource={product.attributes}
        renderItem={(item) => (
          <List.Item>
            <Card title={<Text type="secondary">{item.code}</Text>}>
              {item.value}
            </Card>
          </List.Item>
        )}
      />
      <Button style={{ alignSelf: "end" }} onClick={onClickEditButton}>
        Edit
      </Button>
    </Flex>
  );
};
