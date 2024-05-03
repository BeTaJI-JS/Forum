import { useCallback, useState, useId } from "react";
import { ModalForm } from "../../ModalForm";
import { useDispatch } from "react-redux";
import { Form, Input } from "antd";
import { nanoid } from "nanoid";
import { addItem } from "../../../store/forumsSlice";

const AddFolderForm = ({
  isOpenFolderForm,
  onCancle,
  parentId = null,
  length = 0,
}) => {
  // надо получать id папки из урлы, useLocation?????  на верхнем уровне
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onClose = () => {
    form.resetFields();
    onCancle();
  };

  const handleSubmit = useCallback(() => {
    console.log("ДОБАВИЛ ПАПКУ!");
    dispatch(
      addItem({
        title,
        id: nanoid(),
        isFolder: true,
        // key: `${parentId}-${length}`,
        parentId,
      }),
    );

    onClose();
  }, [dispatch, setTitle, onCancle, title]);

  return (
    <ModalForm
      title={"Добавить папку"}
      isOpen={isOpenFolderForm}
      onClose={onClose}
      onSave={handleSubmit}
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
export default AddFolderForm;
