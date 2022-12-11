import { Table } from "antd";
import {
  Category,
  CategoriesDataProps,
} from "../../../../../utils/commonInterfaces";
import { Footer, Pagination, Actions, IconButton } from "./styles";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";

interface TableProps {
  data: CategoriesDataProps | null;
  callback: (page?: number) => void;
  handleEdit: (data: Category) => () => void;
  handleDelete: (data: Category) => () => void;
}

const TableComponent: React.FC<TableProps> = ({
  data,
  callback,
  handleEdit,
  handleDelete,
}): React.ReactElement => {
  const columns: ColumnsType<Category> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Desription",
      dataIndex: "description",
      key: "description",
      width: 600,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (value: string) => moment(value).format("DD.MM.YYYY"),
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (value: string) => moment(value).format("DD.MM.YYYY"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (row: Category) => (
        <Actions>
          <Tooltip color="#1990ff" title="Edit Category">
            <IconButton onClick={handleEdit(row)}>
              <EditTwoTone />
            </IconButton>
          </Tooltip>
          <Tooltip color="#eb2f95" title="Delete Category">
            <IconButton onClick={handleDelete(row)}>
              <DeleteTwoTone twoToneColor="#eb2f96" />
            </IconButton>
          </Tooltip>
        </Actions>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        rowKey="id"
        dataSource={data?.data}
        pagination={false}
      />
      {data ? (
        <Footer key={JSON.stringify(data.current_page)}>
          <Pagination
            defaultCurrent={data?.current_page}
            total={data?.total}
            showSizeChanger={false}
            onChange={callback}
            showTotal={(total) => `Total ${total} items`}
          />
        </Footer>
      ) : null}
    </>
  );
};

export default TableComponent;
