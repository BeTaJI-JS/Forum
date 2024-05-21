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
          path='/Forum/profile'
          element={
            <>
              <Profile />
            </>
          }
        />
        {/* <Route // удалит ькомпонент и все чт ос ним связано - использовать NestedContent ( переименовать его в Main)
          path='/Forum'
          exact
          element={
            <Layout>
              <App />
            </Layout>
          }
        /> */}
        <Route
          path='/Forum/document/*'
          element={
            <Layout>
              <DocumentDetails />
            </Layout>
          }
        />
        <Route
          path='/Forum/*'
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
