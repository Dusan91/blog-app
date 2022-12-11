import { Table } from "antd";
import {
  Article,
  ArticlesDataProps,
} from "../../../../../utils/commonInterfaces";
import {
  ExpanedRow,
  ExpanedRowHeader,
  Footer,
  Pagination,
  Actions,
  IconButton,
} from "./styles";
import {
  EditTwoTone,
  DeleteTwoTone,
  MinusCircleTwoTone,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";

interface TableProps {
  data: ArticlesDataProps | null;
  callback: (page?: number) => void;
  handleEdit: (data: Article) => () => void;
  handleDelete: (data: Article) => () => void;
}

const TableComponent: React.FC<TableProps> = ({
  data,
  callback,
  handleEdit,
  handleDelete,
}): React.ReactElement => {
  const FORMAT: string = "DD.MM.YYYY";
  const columns: ColumnsType<Article> = [
    Table.EXPAND_COLUMN,
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 450,
    },

    {
      title: "User ID",
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "Category ID",
      dataIndex: "category_id",
      key: "category_id",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (value: string) => moment(value).format(FORMAT),
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (value: string) => moment(value).format(FORMAT),
    },
    {
      key: "actions",
      render: (row: Article) => (
        <Actions>
          <Tooltip color="#1990ff" title="Edit Article">
            <IconButton onClick={handleEdit(row)}>
              <EditTwoTone />
            </IconButton>
          </Tooltip>
          <Tooltip color="#eb2f95" title="Delete Article">
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
        expandable={{
          expandedRowRender: (record) => (
            <>
              <ExpanedRowHeader>Body</ExpanedRowHeader>
              <ExpanedRow>{record?.body}</ExpanedRow>
            </>
          ),
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              <Tooltip color="#1990ff" title="Hide body">
                <MinusCircleTwoTone onClick={(e) => onExpand(record, e)} />
              </Tooltip>
            ) : (
              <Tooltip color="#1990ff" title="Show body">
                <PlusCircleTwoTone onClick={(e) => onExpand(record, e)} />
              </Tooltip>
            ),
        }}
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
