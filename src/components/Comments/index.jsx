import { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Button } from "components/ButtonsBar/styles";
import { MarkdownView } from "components/Profile/styles";

import { deleteComment } from "store/comments";

const Comments = ({ data, isOpenAnswerForm, setEditItem, setIsAnswerForm, setIsEditAnswerForm }) => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  const auth = useSelector((state) => state.auth);

  const deleteCommentHandler = useCallback(
    (item) => {
      dispatch(deleteComment({ ...item }));
    },
    [dispatch],
  );

  const editCommentHandler = useCallback(
    (item) => {
      setIsAnswerForm(!isOpenAnswerForm);
      setIsEditAnswerForm(true);
      setEditItem(item);
    },
    [setEditItem, setIsAnswerForm, setIsEditAnswerForm, isOpenAnswerForm],
  );

  const userForComment = useCallback((comment) => users.find((user) => user.id === comment.createdAt), [users]);

  return (
    <>
      <div
        style={{ color: "#194390", fontSize: 20, fontWeight: 700, textAlign: "center", textDecoration: "underline" }}
      >
        Чат по текущему форуму
      </div>
      {data.length > 0 ? (
        data.map((comment) => (
          <div
            key={comment.id}
            style={{
              border: "2px solid #5C93CC",
              borderRadius: "10px",
              boxShadow: " 0 1px 0 rgba(0,0,0,.1)",
              padding: "10px",
            }}
          >
            <div className='content'>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "end",
                  marginBottom: "10px",
                  position: "relative",
                }}
              >
                {comment.createdAt === auth?.id && (
                  <>
                    <Button onClick={() => editCommentHandler(comment)}>Редактировать ответ</Button>
                    <Button onClick={() => deleteCommentHandler(comment)}>Удалить ответ</Button>
                  </>
                )}
              </div>
              <div className='userInfo'>
                <div
                  style={{
                    display: "flex",
                    gap: "100px",
                  }}
                >
                  <div
                    style={{
                      color: "#194390",
                      display: "flex",
                      flexDirection: "column",
                      fontFamily: "Italic",
                      fontSize: "16px",
                      fontWeight: 700,
                      gap: "10px",
                      maxWidth: "300px",
                      minWidth: "300px",
                      paddingLeft: "10px",
                      textAlign: "left",
                      wordWrap: "break-word",
                    }}
                  >
                    <img src={userForComment(comment)?.avatar} width={100} alt='аватар пользователя' />
                    <div>Имя пользователя: {userForComment(comment)?.login}</div>
                  </div>
                  <MarkdownView
                    source={comment?.text}
                    style={{
                      backgroundColor: "#c6d9e3",
                      borderRadius: "10px",
                      display: "flex",
                      flex: 1,
                      fontSize: "16px",
                      padding: "10px",
                    }}
                  />
                </div>
                <MarkdownView
                  source={userForComment(comment)?.signature}
                  style={{
                    borderTop: "1px solid #194390",
                    fontSize: "16px",
                    marginTop: 10,
                    padding: 5,
                  }}
                  key={comment.id}
                />
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
