import type { GetProp, TableProps } from "antd";
import { Table } from "antd";
import type { SorterResult } from "antd/es/table/interface";
import { FC, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { AttributeValue } from "../../../entities/product-entity";

export interface ProductTableData {
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

interface Props {
  products: ProductTableData[];
  isLoading: boolean;
}

const ProductList: FC<Props> = ({ products, isLoading }) => {
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      showSizeChanger: true,
      pageSizeOptions: [5, 10, 20, 50],
      current: 1,
      pageSize: 5,
    },
  });

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

  useEffect(() => {
    setTableParams((state) => ({
      ...state,
      pagination: {
        ...state.pagination,
        total: products.length,
      },
    }));
  }, [products]);

  return (
    <>
      <Table<ProductTableData>
        columns={columns}
        rowKey={(record) => record.id.toString()}
        dataSource={products}
        pagination={tableParams.pagination}
        loading={isLoading}
        onChange={handleTableChange}
      />
    </>
  );
};

export default ProductList;
