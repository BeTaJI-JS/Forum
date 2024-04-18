import { Layout as AntLayout } from "antd";
import React from "react";
import { ContentContainer, Header } from "./styles";

import logo from "../../assets/logo.png";
// import styles from "./styles.scss";
const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  padding: "20px",
  boxSizing: "border-box",
  backgroundColor: " #9097ad",
  gap: "20px",
  height: "100vh",
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
