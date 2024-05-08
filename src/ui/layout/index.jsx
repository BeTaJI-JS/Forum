import React from "react";
import { ContentContainer } from "./styles";

const Layout = ({ children }) => {
  return (
    <>
      <ContentContainer>{children}</ContentContainer>
    </>
  );
};

export default Layout;
