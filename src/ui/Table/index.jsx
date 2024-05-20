import React, { useCallback, useMemo, useState } from "react";
import { Table as TableAntD } from "antd";
import FileIcon from "assets/file.svg?react";
import FolderIcon from "assets/folder.svg?react";

import { Link } from "react-router-dom";

import ButtonsBar from "components/ButtonsBar";

import { useLocation } from "react-router-dom";
import ItemForm from "ui/Forms/ItemForm";
import FolderForm from "ui/Forms/FolderForm";

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
    render: (text, record) => {
      //TODO ОООООЧень хреновое решение условных конструкций но надо было бысто действовать - подумать как можно переписать сейчас работает
      return (
        <Link
          to={
            record.isFolder && record.parentId === "/Forum/"
              ? `${record.parentId}${record.id}`
              : record.isFolder && record.parentId !== "/Forum/"
                ? `${record.parentId}/${record.id}`
                : !record.isFolder && record.parentId === "/Forum/"
                  ? `/Forum/document${record.parentId.split("/Forum/").slice(1).join("/")}/${record.id}`
                  : `/Forum/document/${record.parentId.split("/Forum/").slice(1).join("/")}/${record.id}`
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
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const { pathname } = useLocation();

  const [isOpenFolderForm, setIsOpenFolderForm] = useState(false);
  const [isOpenItemForm, setIsOpenItemForm] = useState(false);

  const parentId = useMemo(() => {
    const paths = pathname.split("/");
    const lastPath = paths[paths.length - 1];

    return lastPath;
  }, [pathname, selectedRows]);

  const selectedItem = useMemo(() => {
    return data.find((i) => i.key === selectedRows[0]);
  }, [data, selectedRows]);

  const onOpenEditForm = useCallback(() => {
    if (selectedItems[0].isFolder) {
      setIsOpenFolderForm(true);
    } else {
      setIsOpenItemForm(true);
    }
  }, [selectedItems, setIsOpenFolderForm, setIsOpenItemForm]);

  return (
    <>
      <ButtonsBar
        onFolderCreate={() => setIsOpenFolderForm((prev) => !prev)}
        onEditItem={onOpenEditForm}
        onItemCreate={() => setIsOpenItemForm((prev) => !prev)}
        selectedRows={selectedRows}
        onBackNavigate={!!parentId}
      />
      <TableAntD
        columns={columns}
        rowSelection={{
          selectedRows,
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRows(selectedRowKeys);
            setSelectedItems(selectedRows);
          },
        }}
        pagination={false}
        dataSource={data}
      />
      <FolderForm
        isOpenFolderForm={isOpenFolderForm}
        onCancle={setIsOpenFolderForm}
        parentId={pathname}
        selectedItems={selectedItems}
      />
      <ItemForm
        parentId={pathname}
        isOpenItemForm={isOpenItemForm}
        onCancle={setIsOpenItemForm}
        selectedItems={selectedItems}
      />
    </>
  );
};

export default Table;
