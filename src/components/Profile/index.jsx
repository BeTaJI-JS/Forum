import React, { useCallback, useState } from "react";
import { ContentContainer } from "../../ui/layout/styles";
import { ProfileContainer } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileForm from "../../ui/Forms/Profile";
import CryptoJS from "crypto-js";
import { editUser } from "../../store/usersSlice";
import { editAuth } from "../../store/authSlice";
import { nanoid } from "nanoid";

const Profile = () => {
  const [isOpenProfileForm, setIsOpenProfileForm] = useState(false);
  const authUser = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const backBtn = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const editBtn = useCallback(() => {
    setIsOpenProfileForm(true);
  }, []);

  const changeAvatar = useCallback(() => {
    const changedHashEmail = CryptoJS.SHA256(
      authUser.email.toString().toLocaleLowerCase(),
    );

    const newAvatar = `https://www.gravatar.com/avatar/${changedHashEmail}?d=identicon`;
    dispatch(editUser({ avatar: newAvatar, id: authUser.id }));
    dispatch(editAuth({ avatar: newAvatar, id: authUser.id }));
  }, [authUser]);

  return (
    <ContentContainer>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={backBtn}>Назад к форумам</button>
        <div>Личный кабинет</div>
      </div>
      <ProfileContainer>
        <div style={{ display: "flex", gap: "50px", alignItems: "center" }}>
          <img src={authUser.avatar} alt="аватар пользователя" />
          <div>{authUser.login}</div>
        </div>
        <div>Подпись: {authUser.signature}</div>
      </ProfileContainer>
      <button onClick={editBtn}>Редактировать профиль</button>
      <button onClick={changeAvatar}>Сменить аватар</button>
      <ProfileForm
        isOpenProfileForm={isOpenProfileForm}
        setIsOpenProfileForm={setIsOpenProfileForm}
      />
    </ContentContainer>
  );
};

export default Profile;