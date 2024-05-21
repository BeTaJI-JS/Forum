import { useCallback, useEffect } from "react";

import MarkdownEditor from "@uiw/react-markdown-editor";
import { Form } from "antd";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";

import { addComment, editComment } from "store/comments";

import ModalForm from "ui/ModalForm";

function AnswerForm({
  docId,
  editItem,
  folderId = null, // айдишник темы на который идет ответ
  isEditAnswerForm, // айдишник родителя( папки)
  isOpenAnswerForm, // все комментарии текущего форума
  onCancle, // флаг для редактирования
  setEditItem, // сетер для сброса редактированного лемента
}) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const authUser = useSelector((state) => state.auth);

  const onClose = useCallback(() => {
    form.resetFields();
    onCancle();
  }, [onCancle, form]);

  const handleSubmit = useCallback(
    (values) => {
      if (editItem && isEditAnswerForm) {
        dispatch(editComment({ id: editItem.id, ...values }));
        setEditItem(null);
      } else {
        dispatch(
          addComment({
            ...values,
            createdAt: authUser.id,
            docId,
            folderId,
            id: nanoid(),
          }),
        );
      }
      onClose();
    },
    [dispatch, docId, folderId, editItem, isEditAnswerForm, authUser, onClose, setEditItem],
  );

  useEffect(() => {
    if (editItem && isEditAnswerForm) {
      form.setFieldsValue({
        text: editItem.text,
      });
    }
  }, [form, editItem, isEditAnswerForm]);

  return (
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
              message: "Введите текст ответа!",
              required: true,
            },
          ]}
        >
          <MarkdownEditor
            value={form.getFieldValue("text")}
            onChange={(text) => form.setFieldValue({ text })}
            toolbars={["bold", "italic", "image", " quote"]}
            placeholder='Текст ответа'
          />
        </Form.Item>
      </Form>
    </ModalForm>
  );
}

export default AnswerForm;
