import { useCallback, useEffect } from "react";

import { Form, Input } from "antd";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { addItem, editItem } from "store/forums";

import ModalForm from "ui/ModalForm";

const ItemForm = ({ isOpenItemForm, onCancle, parentId = null, selectedItems }) => {
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
            id: nanoid(),
            isFolder: false,
            key: nanoid(),
            parentId,
            path: pathname,
            text: values.text,
            title: values.title,
          }),
        );
      }

      onClose();
    },
    [dispatch, onClose, selectedItems, parentId, pathname],
  );

  useEffect(() => {
    if (selectedItems.length > 0) {
      form.setFieldsValue({
        text: selectedItems[0].text,
        title: selectedItems[0].title,
      });
    }
  }, [form, selectedItems]);

  return (
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
              message: "Please input your username!",
              required: true,
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
              message: "Введите текст записи!",
              required: true,
            },
          ]}
        >
          <Input.TextArea type='text' />
        </Form.Item>
      </Form>
    </ModalForm>
  );
};

export default ItemForm;
