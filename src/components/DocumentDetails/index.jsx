import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { AntLayoutWrapper } from "../../ui/layout/styles";

const DocumentDetails = () => {
  const { id } = useParams();

  const document = useSelector((state) => {
    return state.forums.find((el) => el.id === id);
  });
  console.log("document===>>>", document);

  return (
    // <AntLayoutWrapper>
    <div
      style={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        border: "1px solid green",
        width: "1000px",
        maxHeight: "90vh",
        overflowY: "auto",
        flexDirection: "column",
        gap: 20,
        backgroundСolor: "fafafae0",
        margin: "0 auto",
        fontWeight: 700,
      }}
    >
      <div
        style={{
          border: "1px solid red",
          fontSize: "40px",
          color: "darkBlue",
        }}
      >
        {document?.title}
      </div>
      <div
        style={{
          border: "1px solid blue",
          fontSize: "16px",
          padding: 10,
          background: "#fafafae0",
          borderRadius: "5px",
          color: "#34495E",
        }}
      >
        {document?.text}
      </div>
    </div>
    // </AntLayoutWrapper>
  );
};

export default DocumentDetails;
