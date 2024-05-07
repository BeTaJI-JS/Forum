import React from "react";
import { ModalForm } from "../../ModalForm";
import { useDispatch } from "react-redux";
import { Form, Input } from "antd";
import { nanoid } from "nanoid";
import { useCallback, useEffect } from "react";
import { addItem, editItem } from "../../../store/forumsSlice";

const ItemForm = ({
  isOpenItemForm,
  onCancle,
  selectedItems,
  parentId = null,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onClose = () => {
    form.resetFields();
    onCancle();
  };

  const handleSubmit = useCallback(
    (values) => {
      if (selectedItems.length > 0) {
        console.log("values==> FORM ITEM", values);
        dispatch(editItem({ id: selectedItems[0].id, ...values }));
      } else {
        console.log("ДОБАВИЛ Запись епта!");

        dispatch(
          addItem({
            title: values.title,
            text: values.text,
            id: nanoid(),
            isFolder: false,
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
      form.setFieldsValue({
        title: selectedItems[0].title,
        text: selectedItems[0].text,
      });
    }
  }, [selectedItems.length, form]);
  console.log("selectedItems В ФОРМЕ АЙТЕМА", selectedItems);
  return (
    <>
      <ModalForm
        isOpen={isOpenItemForm}
        onClose={onClose}
        title={
          selectedItems.length <= 0 ? "Добавить запись" : "Редактировать запись"
        }
        onSave={form.submit}
      >
        <Form
          name="itemForm"
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
            label="Название темы"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Текст записи"
            name="text"
            rules={[
              {
                required: true,
                message: "Введите текст записи!",
              },
            ]}
          >
            <Input.TextArea type="text" />
          </Form.Item>
          {/* <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item> */}
        </Form>
      </ModalForm>
    </>
  );
};

export default ItemForm;
