import React from "react";
import { ModalForm } from "../../ModalForm";
import { useDispatch } from "react-redux";
import { Form, Input } from "antd";
import { nanoid } from "nanoid";
import { useCallback, useEffect } from "react";
import { addItem, editItem } from "../../../store/forums";
import { useLocation } from "react-router-dom";

// import MarkdownEditor from "@uiw/react-markdown-editor";

const ItemForm = ({ isOpenItemForm, onCancle, selectedItems, parentId = null }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [form] = Form.useForm();

  const onClose = useCallback(() => {
    form.resetFields();
    onCancle();
  }, [onCancle, form]);

  const handleSubmit = useCallback(
    (values) => {
      if (selectedItems.length > 0) {
        dispatch(editItem({ id: selectedItems[0].id, ...values }));
      } else {
        dispatch(
          addItem({
            title: values.title,
            text: values.text,
            id: nanoid(),
            isFolder: false,
            key: nanoid(),
            parentId,
            path: pathname,
          }),
        );
      }

      onClose();
    },
    [dispatch, onCancle, selectedItems, parentId, form, onClose],
  );

  useEffect(() => {
    if (selectedItems.length > 0) {
      form.setFieldsValue({
        title: selectedItems[0].title,
        text: selectedItems[0].text,
      });
    }
  }, [form, selectedItems]);

  return (
    <>
      <ModalForm
        isOpen={isOpenItemForm}
        onClose={onClose}
        title={selectedItems.length <= 0 ? "Добавить запись" : "Редактировать запись"}
        onSave={form.submit}
      >
        <Form
          name='itemForm'
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
            label='Название темы'
            name='title'
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input type='text' />
          </Form.Item>
          <Form.Item
            label='Текст записи'
            name='text'
            rules={[
              {
                required: true,
                message: "Введите текст записи!",
              },
            ]}
          >
            <Input.TextArea type='text' />
          </Form.Item>
        </Form>
      </ModalForm>
    </>
  );
};

export default ItemForm;
