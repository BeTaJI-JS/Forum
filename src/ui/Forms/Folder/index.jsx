import { useCallback, useEffect } from "react";

import { Form, Input } from "antd";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";

import { addItem, editItem } from "store/forums";

import ModalForm from "ui/ModalForm";

const FolderForm = ({ isOpenFolderForm, onCancle, parentId = null, selectedItems }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onClose = useCallback(() => {
    form.resetFields();
    onCancle();
  }, [form, onCancle]);

  const handleSubmit = useCallback(
    (values) => {
      if (selectedItems.length > 0) {
        dispatch(editItem({ id: selectedItems[0].id, ...values }));
      } else {
        dispatch(
          addItem({
            id: nanoid(),
            isFolder: true,
            key: nanoid(),
            parentId,
            title: values.title,
          }),
        );
      }

      onClose();
    },
    [dispatch, onClose, selectedItems, parentId],
  );

  useEffect(() => {
    if (selectedItems.length > 0) {
      form.setFieldsValue({ title: selectedItems[0].title });
    }
  }, [selectedItems, form]);

  return (
    <ModalForm
      title={selectedItems.length <= 0 ? "Добавить папку" : "Редактировать папку"}
      isOpen={isOpenFolderForm}
      onClose={onClose}
      onSave={form.submit}
    >
      <Form
        name='addFolder'
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
          label='Название папки'
          name='title'
          rules={[
            {
              message: "Введите название папки!",
              required: true,
            },
          ]}
        >
          <Input type='text' />
        </Form.Item>
      </Form>
    </ModalForm>
  );
};
export default FolderForm;
