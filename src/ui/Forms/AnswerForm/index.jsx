import React from "react";
import { ModalForm } from "../../ModalForm";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input } from "antd";
import { nanoid } from "nanoid";
import { useCallback, useEffect } from "react";

import { addComment, editComment } from "../../../store/comments";
import MarkdownEditor from "@uiw/react-markdown-editor";

const AnswerForm = ({
  isOpenAnswerForm,
  onCancle,
  // selectedItems,
  docId, // айдишник темы на который идет ответ
  folderId = null, // айдишник родителя( папки)
  editItem, // все комментарии текущего форума
  isEditAnswerForm, // флаг для редактирования
  setEditItem, // сетер для сброса редактированного лемента
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const authUser = useSelector((state) => state.auth);

  const onClose = () => {
    form.resetFields();
    onCancle();
  };

  const handleSubmit = useCallback(
    (values) => {
      if (editItem && isEditAnswerForm) {
        dispatch(editComment({ id: editItem.id, ...values }));
        setEditItem(null);
      } else {
        dispatch(
          addComment({
            ...values,
            docId,
            folderId,
            createdAt: authUser.id,
            id: nanoid(),
          }),
        );
      }
      onClose();
    },
    [dispatch, onCancle, docId, folderId, editItem, isEditAnswerForm],
  );

  useEffect(() => {
    if (editItem && isEditAnswerForm) {
      form.setFieldsValue({
        text: editItem.text,
      });
    }
  }, [form, editItem, isEditAnswerForm]);

  return (
    <>
      <ModalForm
        isOpen={isOpenAnswerForm}
        onClose={onClose}
        title={!editItem ? "Добавление ответа на сообщение" : "Редактирование ответа на сообщение"}
        onSave={form.submit}
      >
        <Form
          name='answerForm'
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={handleSubmit}
          autoComplete='off'
          form={form}
        >
          <Form.Item
            label='Текст ответа'
            name='text'
            rules={[
              {
                required: true,
                message: "Введите текст ответа!",
              },
            ]}
          >
            <MarkdownEditor
              value={form.getFieldValue("text")}
              onChange={(text) => form.setFieldValue({ text })}
              toolbars={["bold", "italic", "image", " quote"]}
              placeholder={"Текст ответа"}
            />
          </Form.Item>
        </Form>
      </ModalForm>
    </>
  );
};

export default AnswerForm;
