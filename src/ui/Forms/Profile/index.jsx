import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ModalForm } from "../../ModalForm";
import { editUser } from "../../../store/usersSlice";
import { editAuth } from "../../../store/authSlice";

const ProfileForm = ({ isOpenProfileForm, setIsOpenProfileForm }) => {
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth);

  const [form] = Form.useForm();

  const onCancle = useCallback(() => {
    form.resetFields();
    setIsOpenProfileForm(false);
  }, [setIsOpenProfileForm]);

  const handleSubmit = useCallback(
    (values) => {
      dispatch(
        editUser({
          login: values.login,
          signature: values.signature,
          id: authUser.id,
        }),
      );
      dispatch(
        editAuth({
          login: values.login,
          signature: values.signature,
          id: authUser.id,
        }),
      );

      onCancle();
    },
    [dispatch, authUser.id, onCancle],
  );

  useEffect(() => {
    if (isOpenProfileForm) {
      form.setFieldsValue({
        login: authUser.login,
        signature: authUser.signature,
      });
    }
  }, [authUser.login, authUser.signature, form, isOpenProfileForm]);

  return (
    <>
      <ModalForm
        isOpen={isOpenProfileForm}
        title={"Редактирование профиля"}
        onClose={onCancle}
        onSave={form.submit}
      >
        <Form
          name="profile"
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
          <Form.Item label="Логин" name="login">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Подпись" name="signature">
            <Input type="text" />
          </Form.Item>
        </Form>
      </ModalForm>
    </>
  );
};

export default ProfileForm;
