import { useCallback, useState, useId, useEffect } from "react";
import { ModalForm } from "../../ModalForm";
import { useDispatch } from "react-redux";
import { Form, Input } from "antd";
import { nanoid } from "nanoid";
import { addItem, editItem } from "../../../store/forumsSlice";

const AddFolderForm = ({
  isOpenFolderForm,
  onCancle,
  parentId = null,
  selectedItems,
  length = 0,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onClose = () => {
    form.resetFields();
    onCancle();
  };

  const handleSubmit = useCallback(
    (values) => {
      console.log("ДОБАВИЛ ПАПКУ!");

      if (selectedItems.length > 0) {
        console.log("values==> FORM", values);
        dispatch(editItem({ id: selectedItems[0].id, ...values }));
      } else {
        dispatch(
          addItem({
            title: values.title,
            id: nanoid(),
            isFolder: true,
            // key: `${parentId}-${length}`,
            key: nanoid(),
            parentId,
          }),
        );
      }

      onClose();
    },
    [dispatch, onCancle, selectedItems],
  );

  useEffect(() => {
    if (selectedItems.length > 0) {
      form.setFieldsValue({ title: selectedItems[0].title });
    }
  }, [selectedItems.length, form]);

  return (
    <ModalForm
      title={
        selectedItems.length <= 0 ? "Добавить папку" : "Редактировать папку"
      }
      isOpen={isOpenFolderForm}
      onClose={onClose}
      onSave={form.submit}
    >
      <Form
        name="addFolder"
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
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="Название папки"
          name="title"
          rules={[
            {
              required: true,
              message: "Введите название папки!",
            },
          ]}
        >
          <Input type="text" />
        </Form.Item>
      </Form>
    </ModalForm>
  );
};
export default AddFolderForm;
