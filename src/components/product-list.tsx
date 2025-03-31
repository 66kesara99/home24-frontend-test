import type { GetProp, TableProps } from "antd";
import { App, Table } from "antd";
import type { SorterResult } from "antd/es/table/interface";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { getProducts } from "../api/products";
import { AttributeValue } from "../entities/product-entity";
import { CategoryContext } from "../state/category-state/category-context";

interface ProductTableData {
  id: number;
  name: string;
  categoryName: string;
  attributes: AttributeValue[];
}

type ColumnsType<T extends object = object> = TableProps<T>["columns"];
type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
}

const columns: ColumnsType<ProductTableData> = [
  {
    title: "Product Id",
    dataIndex: "id",
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: "Product Name",
    dataIndex: "name",
    sorter: (a, b) => (a.name > b.name ? 1 : -1),
  },
  {
    title: "Category",
    dataIndex: "categoryName",
    sorter: (a, b) => (a.categoryName > b.categoryName ? 1 : -1),
    responsive: ["md"],
  },
  {
    title: "Action",
    key: "action",
    render: (record) => <NavLink to={`${record.id}`}>View</NavLink>,
  },
];

const ProductList: React.FC = () => {
  const { selectedCategory, categoryMap } = useContext(CategoryContext);
  const { message } = App.useApp();

  const [data, setData] = useState<ProductTableData[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      showSizeChanger: true,
      pageSizeOptions: [5, 10, 20, 50],
      current: 1,
      pageSize: 5,
    },
  });

  const fetchData = useCallback(async () => {
    if (!selectedCategory) {
      return;
    }

    setLoading(true);

    const selectedCategories: string[] = [selectedCategory.key.toString()];
    if (selectedCategory.children) {
      selectedCategory.children.forEach((item) => {
        selectedCategories.push(item.key.toString());
      });
    }

    try {
      const results = await getProducts({
        selectedCategories,
      });

      if (results) {
        setData(
          results.map((item) => ({
            id: item.id,
            name: item.name,
            categoryName: categoryMap[item.category_id],
            attributes: item.attributes,
          }))
        );
        setTableParams((state) => ({
          ...state,
          pagination: {
            ...state.pagination,
            total: results.length,
          },
        }));
      }
    } catch (e) {
      message.error("Something went wrong!");
      console.error(e);
    }

    setLoading(false);
  }, [categoryMap, message, selectedCategory]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTableChange: TableProps<ProductTableData>["onChange"] = (
    pagination,
    _, // No filters in the requirement
    sorter
  ) => {
    setTableParams({
      pagination,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });
  };

  return (
    <>
      <Table<ProductTableData>
        columns={columns}
        rowKey={(record) => record.id.toString()}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </>
  );
};

export default ProductList;
