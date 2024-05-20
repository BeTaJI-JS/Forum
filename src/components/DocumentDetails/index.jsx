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

  const document = useSelector((state) => {
    return state.forums.find((el) => el.id === id);
  });

  const comments = useSelector((state) => state.comments);

  const currentComments = useMemo(() => comments.filter((el) => el.docId === id), [comments, id]);

  return (
    <>
      <ButtonsBar customButton titleButton={"Ответить"} onCustomClick={() => setIsAnswerForm(true)} onBackNavigate />
      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: 20,
          backgroundСolor: "fafafae0",
        }}
      >
        <div
          style={{
            fontSize: "40px",
            color: "#000082",
            fontWeight: 700,
          }}
        >
          {document?.title}
        </div>
        <div
          style={{
            border: "2px solid  #5C93CC",
            fontSize: "20px",
            padding: 10,
            background: "#fafafae0",
            borderRadius: "10px",
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
