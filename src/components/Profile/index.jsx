import React, { useCallback, useState } from "react";
import { ContentContainer } from "../../ui/layout/styles";
import { MarkdownView, ProfileContainer } from "./styles";
import { useSelector } from "react-redux";

import ProfileForm from "../../ui/Forms/Profile";
import MarkdownEditor from "@uiw/react-markdown-editor";
import ButtonsBar from "../ButtonsBar";
import { Button } from "../ButtonsBar/styles";

const Profile = () => {
  const [isOpenProfileForm, setIsOpenProfileForm] = useState(false);
  const authUser = useSelector((state) => state.auth);

  const editBtn = useCallback(() => {
    setIsOpenProfileForm(true);
  }, [setIsOpenProfileForm]);

  return (
    <ContentContainer>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <ButtonsBar onBackNavigate />

        <div style={{ fontSize: "24px", fontWeight: "700", color: "#194390", textDecoration: "underline" }}>
          Личный кабинет
        </div>
      </div>
      <ProfileContainer>
        <div style={{ display: "flex", gap: "50px", alignItems: "center", width: "200px", height: "200px" }}>
          <img src={authUser?.avatar} alt='аватар пользователя' style={{ width: "100%", height: "100%" }} />
        </div>
        <div style={{ fontSize: 20, color: "#194390", fontWeight: 700 }}>Имя пользователя: {authUser?.login}</div>
        <div
          style={{
            display: "flex",
            gap: "50px",
            alignItems: "center",
            fontSize: 20,
            color: "#194390",
            fontWeight: 700,
          }}
        >
          Подпись: <MarkdownView source={authUser?.signature} className='markdownView' />
        </div>
        <Button onClick={editBtn}>Редактировать профиль</Button>
      </ProfileContainer>
      <ProfileForm isOpenProfileForm={isOpenProfileForm} setIsOpenProfileForm={setIsOpenProfileForm} />
    </ContentContainer>
  );
};

export default Profile;
