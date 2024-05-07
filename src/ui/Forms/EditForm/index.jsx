import React, { useCallback, useState } from "react";
import { ModalForm } from "../../ModalForm";
import { useDispatch } from "react-redux";
import { Form, Input } from "antd";
import { editItem } from "../../../store/forumsSlice";

const EditForm = ({ onCancle, editElement, setIsOpenEditForm, isOpen }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const onClose = () => {
    form.resetFields();
    onCancle();
  };

  const handleSubmit = useCallback(() => {
    console.log("Я изменил поля в записи!!!!");
    dispatch(
      editItem({
        ...editElement,
        title,
      }),
    );

    onClose();
  }, [dispatch, setTitle, onCancle, title, editElement]);

  return (
    <ModalForm
      title={"Редактировать запись"}
      onSave={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form
        name="editFolder"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
        // onFinishFailed={onFinishFailed}
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
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>
      </Form>
    </ModalForm>
  );
};

export default EditForm;
