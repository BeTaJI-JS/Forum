import { useCallback, useMemo, useState } from "react";

import { Button, Form, Input } from "antd";
import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";
import { nanoid } from "nanoid";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";

import { addAuthUser } from "store/auth";
import { setUser } from "store/users";

import ModalForm from "ui/ModalForm";

import styles from "./styles.module.scss";

const AuthForm = ({ open, setOpen }) => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [signature, setSignature] = useState("");
  const [isRegistration, setIsRegistration] = useState(false);

  const [, setCookies] = useCookies();

  const [form] = Form.useForm();

  const hashedPassword = useMemo(() => bcrypt.hashSync(password, 10), [password]);

  // TODO мой вариант
  // const hashedEmail = useMemo(() => {
  //   return CryptoJS.SHA256(email.toString().toLocaleLowerCase())
  // }, [email]);

  // TODO решение от gpt с добалением hex - но оно тоже не фурычит
  const hashedEmail = useMemo(
    () => CryptoJS.SHA256(email.toString().toLocaleLowerCase()).toString(CryptoJS.enc.Hex),
    [email],
  );

  const avatar = useMemo(() => `https://www.gravatar.com/avatar/${hashedEmail}?d=identicon`, [hashedEmail]);

  const userId = useMemo(() => nanoid(), []);
  const handleSubmit = () => {
    const findUser = users.find((el) => el.login === login && bcrypt.compareSync(password, el.password));
    if (findUser) {
      dispatch(addAuthUser({ ...findUser }));
      setCookies("userInfo", { login, password }, { maxAge: 60 * 1000 * 120 });
      form.resetFields();
      setOpen(false);
    } else {
      alert("Пользователь не найден"); // TODO  заглушка для ошибки валидации формы
    }
  };

  const handleRegistrationSubmit = useCallback(() => {
    dispatch(
      setUser({
        avatar,
        email,
        id: userId,
        login,
        password: hashedPassword,
        signature,
      }),
    );
    form.resetFields();
    setOpen(false);
  }, [dispatch, login, signature, setOpen, form, userId, avatar, email, hashedPassword]);

  const onCancle = useCallback(() => {
    form.resetFields();
    setOpen(false);
  }, [setOpen, form]);

  return (
    <div className={styles.formWrapper}>
      <ModalForm
        isOpen={open}
        onClose={onCancle}
        title={!isRegistration ? "Авторизация пользователя" : "Регистрация пользователя"}
        disableFooter
      >
        {!isRegistration && (
          <>
            <Form
              name='auth'
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
              autoComplete='off'
              form={form}
            >
              <Form.Item
                label='Username'
                name='username'
                rules={[
                  {
                    message: "Please input your username!",
                    required: true,
                  },
                ]}
              >
                <Input value={login} onChange={(e) => setLogin(e.target.value)} />
              </Form.Item>
              <Form.Item
                label='Password'
                name='password'
                rules={[
                  {
                    message: "Please input your password!",
                    required: true,
                  },
                ]}
              >
                <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <Form.Item style={{ display: "flex", justifyContent: "center" }}>
              <a onClick={() => setIsRegistration(true)}>Нет аккаунта? Зарегистрируй!</a>
            </Form.Item>
          </>
        )}
        {isRegistration && (
          <>
            <Form
              name='registration'
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
              autoComplete='off'
              form={form}
            >
              <Form.Item
                label='Username'
                name='username'
                rules={[
                  {
                    message: "Please input your username!",
                    required: true,
                  },
                ]}
              >
                <Input value={login} onChange={(e) => setLogin(e.target.value)} />
              </Form.Item>
              <Form.Item
                label='Password'
                name='password'
                rules={[
                  {
                    message: "Please input your password!",
                    required: true,
                  },
                ]}
              >
                <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Item>
              <Form.Item label='email' name='email'>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Item>
              <Form.Item label='signature' name='signature'>
                <Input value={signature} onChange={(e) => setSignature(e.target.value)} />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type='primary' htmlType='submit'>
                  Зарегистрироваться
                </Button>
              </Form.Item>
            </Form>
            <Form.Item style={{ display: "flex", justifyContent: "center" }}>
              <a onClick={() => setIsRegistration(false)}>Уже есть аккаунт - перейти к авторизации</a>
            </Form.Item>
          </>
        )}
      </ModalForm>
    </div>
  );
};

export default AuthForm;
