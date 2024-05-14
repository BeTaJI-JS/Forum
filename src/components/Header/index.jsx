import React, { useEffect, useState } from "react";
import { HeaderContent } from "./styles";
import logo from "../../assets/logo.png";
import IconUser from "../../assets/user.svg?react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../ui/Forms/Auth";
import { removeAuth } from "../../store/auth";
import { persistor } from "../../store";
import { useCookies } from "react-cookie";
import { removeUsers } from "../../store/users";

export const Header = () => {
  const dispatch = useDispatch(); // TODO тоже убрать отсюда позже
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const [cookies, removeCookies] = useCookies(["userInfo"], { path: "/forum" });

  const navigate = useNavigate();

  //TODO придумать логику по разлогину и чистке куки

  const authUser = useSelector((state) => state.auth);

  useEffect(() => {
    if (!cookies.userInfo) {
      console.log("Сброс авторизации");
      dispatch(removeAuth());
    }
  }, [dispatch, cookies]);

  useEffect(() => {
    return () => {
      persistor.flush().then(() => {
        console.log("persistor.purge()!!!! чистим локалсторадж");
        persistor.purge();
        removeUsers();
        if (cookies.userInfo) {
          cookies.removeCookies("userInfo");
          // removeCookies("userInfo");
        }
      });
    };
  }, [persistor, cookies, removeCookies]);

  return (
    <>
      <HeaderContent>
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
      </HeaderContent>
      <AuthForm open={openAuthModal} setOpen={setOpenAuthModal} />
    </>
  );
};

export default Header;
