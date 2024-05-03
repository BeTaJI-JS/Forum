import { useSelector } from "react-redux";

import "./App.css";
import Layout from "./ui/layout";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import FileIcon from "./assets/file.svg?react";
import FolderIcon from "./assets/folder.svg?react";
import Card from "./ui/Card";
import NestedContent from "./components/NestedContent";
import Profile from "./components/Profile";
// import { Table } from "antd";
import { render } from "react-dom";
import Table from "./ui/Table";
import DocumentDetails from "./components/DocumentDetails";
// import { useMemo } from "react";

function App() {
  const forums = useSelector((state) => {
    return state.forums;
  });

  console.log("forums===>", forums);
  const navigate = useNavigate();

  // const columns = [
  //   {
  //     title: <FileIcon />,
  //     dataIndex: "isFolder",
  //     render: (value) => {
  //       return value ? <FolderIcon /> : <FileIcon />;
  //     },
  //     width: 50,
  //   },
  //   {
  //     title: "Название",
  //     dataIndex: "title",
  //     render: (text, record) => <Link to={`/forum/${record.id}`}>{text}</Link>,
  //     width: 600,
  //   },

  //   {
  //     title: "Текст",
  //     dataIndex: "text",
  //   },
  // ];

  //! вынести  в комопнеет mainPage то чт овнутри layout - думаю да?
  return (
    <>
      <Routes>
        <Route
          path="/forum"
          element={
            <Layout>
              {/* {forums?.map((forum) => (
                <Card
                  key={forum.id}
                  onClick={() => {
                    return navigate(`/forum/${forum.id}`);
                  }}
                >
                  <div>{forum.title}</div>
                  <div>{forum.text}</div>
                </Card>
              ))} */}
              {/* <Table
                rowSelection
                columns={columns}
                dataSource={forums}
                pagination={false}
              /> */}
              <Table data={forums} />
            </Layout>
          }
        />
        <Route
          path="/forum/document/:id"
          element={
            <Layout disabledButtonsBar>
              <DocumentDetails />
            </Layout>
          }
        />
        <Route
          path="/forum/:id/*"
          element={
            <Layout>
              <NestedContent />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Profile />
            </>
          }
        />
        {/* <Layout>
        {allData.map((forum) => (
          <Card key={forum.id}>
            <div>{forum.title}</div>
            <div>{forum.text}</div>
          </Card>
        ))}
      </Layout> */}
      </Routes>
    </>
  );
}

export default App;
