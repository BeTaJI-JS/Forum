import { Routes, Route } from "react-router-dom";

import Layout from "../ui/layout";
import Table from "../ui/Table";
import NestedContent from "../components/NestedContent";
import Profile from "../components/Profile";
import DocumentDetails from "../components/DocumentDetails";
import App from "../App";
const Root = () => {
  //после авторизации редирект на /forum
  //кнопка на форумы.
  return (
    <>
      <Routes>
        <Route
          path='/forum/profile'
          element={
            <>
              <Profile />
            </>
          }
        />
        <Route
          path='/forum'
          exact
          element={
            <Layout>
              <App />
            </Layout>
          }
        />
        <Route
          path='/forum/document/*'
          element={
            <Layout>
              <DocumentDetails />
            </Layout>
          }
        />
        <Route
          path='/forum/*'
          element={
            <Layout>
              <NestedContent />
            </Layout>
          }
        />
      </Routes>
    </>
  );
};

export default Root;
