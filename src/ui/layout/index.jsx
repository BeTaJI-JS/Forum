import React, { useEffect, useState } from "react";
import { ContentContainer, Header, AntLayoutWrapper } from "./styles";

import { persistor } from "../../store";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";
import IconUser from "../../assets/user.svg?react";
import AuthForm from "../Forms/Auth";

import { useCookies } from "react-cookie";

import { removeAuth } from "../../store/authSlice";
import { removeUsers } from "../../store/usersSlice";

const Layout = ({ children }) => {
  const dispatch = useDispatch(); // TODO тоже убрать отсюда позже
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const [cookies, removeCookies] = useCookies(["userInfo"], { path: "/forum" });

  const { pathname } = useLocation();
  const navigate = useNavigate();

  //TODO придумать логику по разлогину и чистке куки

  const authUser = useSelector((state) => state.auth);

  useEffect(() => {
    if (!cookies.userInfo) {
      console.log("Сброс авторизации");
      dispatch(removeAuth());
    }
  }, [dispatch, document.cookie]);

  useEffect(() => {
    return () => {
      persistor.flush().then(() => {
        console.log("persistor.purge()!!!! чистим локалсторадж");
        persistor.purge();
        removeUsers();
        if (cookies.userInfo) {
          cookies.removeCookies("userInfo");
        }
      });
    };
  }, [persistor, removeUsers]);

  //TODO вынести всю логику хедера в отдельный компонент
  return (
    <AntLayoutWrapper>
      <Header>
        <div>
          <img href="#" src={logo} alt="logo" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {authUser?.login && (
            <button onClick={() => navigate("/profile")}>Личный кабинет</button>
          )}
          {authUser?.login || "не авторизованный пользователь"}
          <IconUser onClick={() => setOpenAuthModal((prev) => !prev)} />
          {authUser?.login && (
            <div
              onClick={() => {
                removeCookies("userInfo");
                dispatch(removeAuth());
              }}
            >
              Выйти
            </div>
          )}
        </div>
      </Header>
      <ContentContainer>{children}</ContentContainer>
      <AuthForm open={openAuthModal} setOpen={setOpenAuthModal} />
    </AntLayoutWrapper>
  );
};

export default Layout;
