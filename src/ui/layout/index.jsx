// import { Layout as AntLayout } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { ContentContainer, Header, AntLayoutWrapper } from "./styles";

import { addItem } from "../../store/forumsSlice";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

import logo from "../../assets/logo.png";
import IconUser from "../../assets/user.svg?react";
import AuthForm from "../Forms/Auth";

import { useCookies } from "react-cookie";
import AddFolderForm from "../Forms/AddFolder";
import { removeAuth } from "../../store/authSlice";
import { removeUsers } from "../../store/usersSlice";

// TODO  сделать адекватные стили через styled components (сейчас говно на вентилятор полетело)
const headerControls = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: "20px",
  fontSize: "20px",
};

const Layout = ({ children, disabledButtonsBar }) => {
  const dispatch = useDispatch(); // TODO тоже убрать отсюда позже
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [isOpenFolderForm, setIsOpenFolderForm] = useState(false);

  const [cookies, removeCookies] = useCookies(["userInfo"], { path: "/forum" });

  const { pathname } = useLocation();
  const navigate = useNavigate();

  //TODO придумать логику по разлогину и чистке куки

  const authUser = useSelector((state) => state.auth);

  // TODO убрать логику добавления записи отсюда т к это ui компоент он не должен обладать такими свойствами
  const addElem = useCallback(
    () =>
      dispatch(
        addItem({
          title: "Заголовок записи",
          text: "Текс записи",
          id: nanoid(),
          key: nanoid(),
          isFolder: false,
          parentId: null,
        }),
      ),
    [dispatch],
  );

  useEffect(() => {
    // const user = document?.cookie
    //   .split("; ")
    //   ?.find((el) => el?.includes("userInfo"));
    // console.log("useEffect авторизации");
    // console.log("cookie", cookies);
    if (!cookies.userInfo) {
      console.log("Сброс авторизации");
      dispatch(removeAuth());
    }
  }, [dispatch, document.cookie]);

  // TODO надо будет удалить useEffect по завершению пет проекта ( сделал что бы не копились данные)
  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      persistor.purge();
      removeUsers();
      console.log("persistor.purge()!!!! чистим локалсторадж");
      cookies.removeCookies("userInfo");
    });
  }, []);

  return (
    // <AntLayout style={layoutStyle}>
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
      {/*//TODO убрать эту логику в компонент */}
      {!disabledButtonsBar && (
        <div style={headerControls}>
          <div>Каталог форумов</div>
          <button onClick={addElem} disabled={!authUser?.login}>
            Добавить форум
          </button>
          <button
            onClick={() => setIsOpenFolderForm((prev) => !prev)}
            disabled={!authUser?.login}
          >
            Добавить Папку
          </button>
        </div>
      )}
      <ContentContainer>{children}</ContentContainer>
      <AuthForm open={openAuthModal} setOpen={setOpenAuthModal} />
      <AddFolderForm
        isOpenFolderForm={isOpenFolderForm}
        onCancle={setIsOpenFolderForm}
        parentId={pathname.split("/")[2]}
      />
      {/* </AntLayout> */}
    </AntLayoutWrapper>
  );
};

export default Layout;
