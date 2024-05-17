import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../../store/auth";
import React, { useCallback, useMemo, useState } from "react";
import styles from "./styles.module.scss";
import { Button, Form, Input } from "antd";
import { setUser } from "../../../store/users";
import CryptoJS from "crypto-js";
import { useCookies } from "react-cookie";
import { ModalForm } from "../../ModalForm";
import { nanoid } from "nanoid";

import bcrypt from "bcryptjs";

const AuthForm = ({ open, setOpen }) => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [signature, setSignature] = useState("");
  const [isRegistration, setIsRegistration] = useState(false);

  const [_, setCookies] = useCookies();

  const [form] = Form.useForm();

  console.log("USERS state==>", users);

  const hashedPassword = useMemo(() => {
    return bcrypt.hashSync(password, 10);
  }, [password]);

  //TODO мой вариант
  // const hashedEmail = useMemo(() => {
  //   return CryptoJS.SHA256(email.toString().toLocaleLowerCase())
  // }, [email]);

  //TODO решение от gpt с добалением hex - но оно тоже не фурычит
  const hashedEmail = useMemo(() => {
    return CryptoJS.SHA256(email.toString().toLocaleLowerCase()).toString(
      CryptoJS.enc.Hex,
    );
  }, [email]);

  const avatar = useMemo(() => {
    return `https://www.gravatar.com/avatar/${hashedEmail}?d=identicon`;
  }, [email, hashedEmail]);

  const userId = useMemo(() => {
    return nanoid();
  }, []);
  const handleSubmit = () => {
    const findUser = users.find(
      (el) => el.login === login && bcrypt.compareSync(password, el.password),
    );

    if (findUser) {
      dispatch(
        auth({
          // login,
          // signature,
          // email,
          // avatar,
          // id: userId,
          ...findUser,
        }),
      );
      setCookies("userInfo", { login, password }, { maxAge: 10000 });
      form.resetFields();
      setOpen(false);
    } else {
      alert("Пользователь не найден"); // TODO  заглушка для ошибки валидации формы
    }
  };

  const handleRegistrationSubmit = useCallback(() => {
    dispatch(
      setUser({
        login,
        password: hashedPassword,
        signature,
        email,
        avatar,
        id: userId,
      }),
    );
    form.resetFields();
    setOpen(false);
  }, [dispatch, login, password, signature, setOpen]);

  const onCancle = useCallback(() => {
    form.resetFields();
    setOpen(false);
  }, [setOpen]);

  const onFinishFailed = (errorInfo) => {
    console.log("errorInfo====+++++++++++,", errorInfo);
  };

  return (
    <>
      <div className={styles.formWrapper}>
        <ModalForm
          isOpen={open}
          onClose={onCancle}
          title={
            !isRegistration
              ? "Авторизация пользователя"
              : "Регистрация пользователя"
          }
          disableFooter
        >
          {!isRegistration && (
            <>
              <Form
                name="auth"
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
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
              <Form.Item style={{ display: "flex", justifyContent: "center" }}>
                <a onClick={() => setIsRegistration(true)}>
                  Нет аккаунта? Зарегистрируй!
                </a>
              </Form.Item>
            </>
          )}
          {isRegistration && (
            <>
              <Form
                name="registration"
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
                onFinish={handleRegistrationSubmit}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="email" name="email">
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="signature" name="signature">
                  <Input
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Зарегистрироваться
                  </Button>
                </Form.Item>
              </Form>
              <Form.Item style={{ display: "flex", justifyContent: "center" }}>
                <a onClick={() => setIsRegistration(false)}>
                  Уже есть аккаунт - перейти к авторизации
                </a>
              </Form.Item>
            </>
          )}
        </ModalForm>
      </div>
    </>
  );
};

export default AuthForm;
