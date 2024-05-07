import React, { useCallback, useMemo, useState } from "react";
import { Table as TableAntD } from "antd";
import FileIcon from "../../assets/file.svg?react";
import FolderIcon from "../../assets/folder.svg?react";

import { Link } from "react-router-dom";
import EditForm from "../Forms/EditForm";
import ButtonsBar from "../../components/ButtonsBar";
import AddFolderForm from "../Forms/AddFolder";
import { useLocation } from "react-router-dom";
import ItemForm from "../Forms/ItemForm";

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
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  // const selectedRowKeys = useMemo(() => selectedRowIds || [], [selectedRowIds]);
  // const [isOpenEditForm, setIsOpenEditForm] = useState(false);

  const { pathname } = useLocation();

  const [isOpenFolderForm, setIsOpenFolderForm] = useState(false);
  const [isOpenItemForm, setIsOpenItemForm] = useState(false);

  // const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  // const onClose = useCallback(() => {
  //   setIsOpenEditForm(false);
  // }, [setIsOpenEditForm]);

  const parentId = useMemo(() => {
    const paths = pathname.split("/");
    const lastPath = paths[paths.length - 1];
    return lastPath;
  }, [pathname]);
  console.log("selectedRows--->", selectedRows);
  const selectedItem = useMemo(() => {
    console.log("data table find-->", data);
    return data.find((i) => i.key === selectedRows[0]);
  }, [data, selectedRows]);

  console.log("selectedItem===>", selectedItem);

  const onOpenEditForm = useCallback(() => {
    if (selectedItems[0].isFolder) {
      alert("asf");
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
      />
      <TableAntD
        columns={columns}
        rowSelection={{
          selectedRows,
          // onChange: (_, record) => {
          //   console.log("agrs slectedRows", record);
          // },
          onChange: (selectedRowKeys, selectedRows) => {
            console.log("Selected Row Keys:", selectedRowKeys);
            console.log("Selected Rows:", selectedRows);

            setSelectedRows(selectedRowKeys);
            setSelectedItems(selectedRows);
            // return selectedRows;
            // setSelectedRows(selectedRows);
          },
        }}
        pagination={false}
        dataSource={data}
      />
      {/* <EditForm
        editElement={selectedRows}
        onCancle={onClose}
        isOpen={isOpenEditForm}
      /> */}
      <AddFolderForm
        isOpenFolderForm={isOpenFolderForm}
        onCancle={setIsOpenFolderForm}
        parentId={parentId}
        selectedItems={selectedItems}
      />
      <ItemForm
        parentId={parentId}
        isOpenItemForm={isOpenItemForm}
        onCancle={setIsOpenItemForm}
        selectedItems={selectedItems}
      />
      {/* <EditForm isOpen={isOpenEditForm} onCancle={setIsOpenEditForm} /> */}
    </>
  );
};

export default Table;
