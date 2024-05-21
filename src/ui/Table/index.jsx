/* eslint-disable no-nested-ternary */
import { useCallback, useMemo, useState } from "react";

import { Table as TableAntD } from "antd";
import { Link, useLocation } from "react-router-dom";

import FileIcon from "assets/file.svg?react";
import FolderIcon from "assets/folder.svg?react";

import ButtonsBar from "components/ButtonsBar";

import FolderForm from "ui/Forms/FolderForm";
import ItemForm from "ui/Forms/ItemForm";

const columns = [
  {
    dataIndex: "isFolder",
    render: (value) => (value ? <FolderIcon /> : <FileIcon />),
    title: <FileIcon />,
    width: 50,
  },
  {
    dataIndex: "title",
    render: (text, record) => (
      // TODO ОООООЧень хреновое решение условных конструкций но надо было бысто действовать - подумать как можно переписать сейчас работает
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
    ),
    title: "Название",
    width: 600,
  },
  {
    dataIndex: "text",
    title: "Текст",
  },
];

function Table({ data }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const { pathname } = useLocation();

  const [isOpenFolderForm, setIsOpenFolderForm] = useState(false);
  const [isOpenItemForm, setIsOpenItemForm] = useState(false);

  const parentId = useMemo(() => {
    const paths = pathname.split("/");
    const lastPath = paths[paths.length - 1];

    return lastPath;
  }, [pathname]);

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
          onChange: (selectedRowKeys, selectedElements) => {
            setSelectedRows(selectedRowKeys);
            setSelectedItems(selectedElements);
          },
          selectedRows,
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
}

export default Table;
