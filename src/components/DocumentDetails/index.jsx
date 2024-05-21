import { useMemo, useState } from "react";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ButtonsBar from "components/ButtonsBar";
import Comments from "components/Comments";

import AnswerForm from "ui/Forms/AnswerForm";

const DocumentDetails = () => {
  const [isOpenAnswerForm, setIsAnswerForm] = useState(false);
  const [isEditAnswerForm, setIsEditAnswerForm] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const params = useParams();
  const pathIds = params["*"];

  const { id } = useMemo(
    () => ({
      id: pathIds.split("/").at(-1),
    }),
    [pathIds],
  );

  const document = useSelector((state) => state.forums.find((el) => el.id === id));

  const comments = useSelector((state) => state.comments);

  const currentComments = useMemo(() => comments.filter((el) => el.docId === id), [comments, id]);

  return (
    <>
      <ButtonsBar customButton titleButton='Ответить' onCustomClick={() => setIsAnswerForm(true)} onBackNavigate />
      <div
        style={{
          backgroundСolor: "fafafae0",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: "#000082",
            fontSize: "40px",
            fontWeight: 700,
          }}
        >
          {document?.title}
        </div>
        <div
          style={{
            background: "#fafafae0",
            border: "2px solid  #5C93CC",
            borderRadius: "10px",
            color: "#34495E",
            fontSize: "20px",
            padding: 10,
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
        isEditAnswerForm={isEditAnswerForm}
        editItem={editItem}
        setEditItem={setEditItem}
      />
    </>
  );
};

export default DocumentDetails;
