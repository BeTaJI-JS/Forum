import { Routes, Route } from "react-router-dom";

import Layout from "../ui/layout";
import Table from "../ui/Table";
import NestedContent from "../components/NestedContent";
import Profile from "../components/Profile";
import DocumentDetails from "../components/DocumentDetails";
import App from "../App";
const Root = () => {
  return (
    <>
      <Routes>
        <Route
          path="/forum"
          element={
            <Layout>
              <App />
            </Layout>
          }
        />
        <Route
          path="/forum/document/:id"
          element={
            <Layout>
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
      </Routes>
    </>
  );
};

export default Root;
