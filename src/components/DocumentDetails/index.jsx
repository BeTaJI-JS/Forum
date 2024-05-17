import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ButtonsBar from "../ButtonsBar";
import AnswerForm from "ui/Forms/AnswerForm";
import Comments from "../Comments";

const DocumentDetails = () => {
  const [isOpenAnswerForm, setIsAnswerForm] = useState(false);
  const [isEditAnswerForm, setIsEditAnswerForm] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const params = useParams();
  const pathIds = params["*"];

  const { folderPath, id } = useMemo(() => {
    return {
      folderPath: pathIds.split("/").slice(0, -1).join("/"),
      id: pathIds.split("/").at(-1),
    };
  }, [pathIds]);

  console.log("folderPath, id ", { folderPath, id });

  const document = useSelector((state) => {
    return state.forums.find((el) => el.id === id);
  });
  const comments = useSelector((state) => state.comments);

  const currentComments = useMemo(() => comments.filter((el) => el.docId === id), [comments, id]);
  console.log("currentComments", currentComments);

  return (
    <>
      {/* {currentComments.length < 1 && ( */}
      <ButtonsBar customButton titleButton={"Ответить"} onCustomClick={() => setIsAnswerForm(true)} onBackNavigate />
      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          border: "1px solid green",
          width: "1000px",
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
      <Comments
        data={currentComments}
        setIsAnswerForm={setIsAnswerForm}
        isOpenAnswerForm={isOpenAnswerForm}
        setIsEditAnswerForm={setIsEditAnswerForm}
        setEditItem={setEditItem}
      />
      <AnswerForm
        isOpenAnswerForm={isOpenAnswerForm}
        docId={id}
        onCancle={setIsAnswerForm}
        folderId={document?.parentId}
        // allComments={currentComments}
        isEditAnswerForm={isEditAnswerForm}
        editItem={editItem}
        setEditItem={setEditItem}
      />
    </>
  );
};

export default DocumentDetails;
