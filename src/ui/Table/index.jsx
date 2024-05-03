import React from "react";
import { Table as TableAntD } from "antd";
import FileIcon from "../../assets/file.svg?react";
import FolderIcon from "../../assets/folder.svg?react";

import { Link } from "react-router-dom";

const columns = [
  {
    title: <FileIcon />,
    dataIndex: "isFolder",
    render: (value) => {
      return value ? <FolderIcon /> : <FileIcon />;
    },
    width: 50,
  },
  {
    title: "Название",
    dataIndex: "title",
    // render: (text, record) => <Link to={`/forum/${record.id}`}>{text}</Link>,
    render: (text, record) => {
      console.log("record", record);
      return (
        <Link
          to={
            record.isFolder
              ? `${window.location.pathname}/${record.id}`
              : `${window.location.pathname}/document/${record.id}`
          }
        >
          {text}
        </Link>
      );
    },

    width: 600,
  },
  {
    title: "Текст",
    dataIndex: "text",
  },
];

const Table = ({ data }) => {
  return (
    <TableAntD
      columns={columns}
      rowSelection
      pagination={false}
      dataSource={data}
    />
  );
};

export default Table;
