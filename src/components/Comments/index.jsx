import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../store/comments";
import { MarkdownView } from "../Profile/styles";
import { Button } from "../ButtonsBar/styles";

const Comments = ({ data, isOpenAnswerForm, setIsAnswerForm, setIsEditAnswerForm, setEditItem }) => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  const auth = useSelector((state) => state.auth);

  console.log("comments data", data);

  const deleteCommentHandler = useCallback(
    (item) => {
      console.log("ITEM DELETE=====>", { ...item });
      dispatch(deleteComment({ ...item }));
    },
    [dispatch, deleteComment],
  );

  const editCommentHandler = useCallback(
    (item) => {
      setIsAnswerForm(!isOpenAnswerForm);
      setIsEditAnswerForm(true);
      setEditItem(item);
    },
    [setEditItem, setIsAnswerForm, setIsEditAnswerForm, isOpenAnswerForm],
  );

  return (
    <>
      <div
        style={{ textAlign: "center", fontWeight: 700, fontSize: 20, color: "#194390", textDecoration: "underline" }}
      >
        Чат по текущему форуму
      </div>
      {data.length > 0 ? (
        data.map((el) => (
          <div
            key={el.id}
            style={{
              border: "2px solid #5C93CC",
              boxShadow: " 0 1px 0 rgba(0,0,0,.1)",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <div className='content'>
              <div
                style={{
                  position: "relative",
                  justifyContent: "end",
                  display: "flex",
                  gap: "10px",
                }}
              >
                {el.createdAt === auth?.id && (
                  <>
                    <Button onClick={() => editCommentHandler(el)}>Редактировать ответ</Button>
                    <Button onClick={() => deleteCommentHandler(el)}>Удалить ответ</Button>
                  </>
                )}
              </div>
              <div className='userInfo'>
                {users.map((user) => {
                  if (user.id === el.createdAt) {
                    return (
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          flexDirection: "column",
                          textAlign: "left",
                        }}
                        key={user.id}
                      >
                        <img src={user.avatar} width={100} />
                        <div>Имя пользователя: {user.login}</div>
                      </div>
                    );
                  }
                })}
              </div>
              <div style={{ border: "2px solid red" }}>
                <MarkdownView source={el?.text} />
                {users.map((user) => {
                  if (user.id === el.createdAt) {
                    return (
                      <div
                        key={user.id}
                        style={{
                          borderTop: "1px solid black",
                          marginTop: "10px",
                        }}
                      >
                        {user.signature.length ? (
                          <MarkdownView source={user?.signature} />
                        ) : (
                          `C уважением, ${user.login}`
                        )}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>Нет комментариев к текущей записи</div>
      )}
    </>
  );
};

export default Comments;
