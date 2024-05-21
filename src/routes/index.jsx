import { Routes, Route } from "react-router-dom";

import DocumentDetails from "components/DocumentDetails";
import NestedContent from "components/NestedContent";
import Profile from "components/Profile";

import Layout from "ui/layout";

const Root = () => (
  <Routes>
    <Route path='/Forum/profile' element={<Profile />} />
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
);
export default Root;
