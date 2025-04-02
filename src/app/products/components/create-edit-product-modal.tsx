import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Typography,
} from "antd";
import { FC, useContext, useState } from "react";
import { AttributeType, Product } from "../../../entities/product-entity";
import { CategoryContext } from "../../../state/category-state/category-context";

const { Option } = Select;
const { Text } = Typography;

interface Props {
  product?: Product;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: Product) => Promise<void>;
}

export const CreateEditProductModal: FC<Props> = ({
  product,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { categoryMap } = useContext(CategoryContext);
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: Product) => {
    setIsLoading(true);

    await onSubmit({
      id: values.id,
      name: values.name,
      category_id: values.category_id,
      attributes: values.attributes,
    });
    form.resetFields();
    setIsLoading(false);
  };

  const onFormError = () => {
    console.error("Form Error");
  };

  return (
    <Modal
      title={product ? "Create Product" : "Edit Product"}
      centered
      open={isOpen}
      onCancel={onClose}
      width={{
        xs: "80%",
        sm: "60%",
        md: "50%",
        lg: "40%",
        xl: "30%",
        xxl: "30%",
      }}
      footer={null}
      style={{ margin: "32px 0" }}
    >
      <Form
        form={form}
        name="productForm"
        onFinish={handleSubmit}
        onFinishFailed={onFormError}
        layout="vertical"
      >
        <Form.Item<Product>
          label="ID"
          name="id"
          rules={[{ required: true, message: "Please input an id" }]}
          initialValue={product?.id}
        >
          <InputNumber disabled={!!product} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item<Product>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input a name" }]}
          initialValue={product?.name}
        >
          <Input />
        </Form.Item>

        <Form.Item<Product>
          name="category_id"
          label="Category"
          initialValue={product?.category_id}
          rules={[{ required: true }]}
        >
          <Select placeholder="Select an option" allowClear>
            {Object.entries(categoryMap).map(([key, value]) => (
              <Option key={key} value={parseInt(key)}>
                {value}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.List name="attributes" initialValue={product?.attributes}>
          {(fields, { add, remove }) => (
            <Flex vertical gap="small">
              <Text>Attributes</Text>
              {fields.map(({ key, name, ...restField }) => (
                <Card
                  key={key}
                  title={
                    <Flex justify="end">
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Flex>
                  }
                >
                  <>
                    <Form.Item
                      {...restField}
                      name={[name, "code"]}
                      rules={[
                        { required: true, message: "Please input a code" },
                      ]}
                      label="Code"
                    >
                      <Input placeholder="Code" />
                    </Form.Item>
                    <Form.Item
                      name={[name, "type"]}
                      label="Type"
                      rules={[
                        {
                          required: true,
                          message: "Please select an attribute",
                        },
                      ]}
                    >
                      <Select placeholder="Select an option" allowClear>
                        {Object.entries(AttributeType).map(([key, value]) => (
                          <Option key={key} value={value}>
                            {key}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "value"]}
                      rules={[
                        { required: true, message: "Please input a value" },
                      ]}
                      label="Value"
                    >
                      <Input placeholder="Value" />
                    </Form.Item>
                  </>
                </Card>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Attribute
                </Button>
              </Form.Item>
            </Flex>
          )}
        </Form.List>

        <Form.Item label={null}>
          <Flex gap="small" justify="end">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
};
