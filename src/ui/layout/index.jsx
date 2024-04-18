import { Layout as AntLayout } from "antd";
import React from "react";
import { ContentContainer, Header } from "./styles";

import logo from "../../assets/logo.png";
const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  padding: "20px",
  boxSizing: "border-box",
  backgroundColor: " #0d1221",
  gap: "20px",
};

const Layout = ({ children }) => {
  return (
    // <Flex>
    <AntLayout style={layoutStyle}>
      <Header>
        <div>
          <img href="#" src={logo} alt="logo" />
        </div>
        <div>Иконка профиля</div>
      </Header>
      <ContentContainer>{children}</ContentContainer>
    </AntLayout>
    // </Flex>
  );
};

export default Layout;
