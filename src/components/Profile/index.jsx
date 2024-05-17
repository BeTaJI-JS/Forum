import React, { useCallback, useState } from "react";
import { ContentContainer } from "../../ui/layout/styles";
import { MarkdownView, ProfileContainer } from "./styles";
import { useSelector } from "react-redux";

import ProfileForm from "../../ui/Forms/Profile";
import MarkdownEditor from "@uiw/react-markdown-editor";
import ButtonsBar from "../ButtonsBar";

const Profile = () => {
  const [isOpenProfileForm, setIsOpenProfileForm] = useState(false);
  const authUser = useSelector((state) => state.auth);

  const editBtn = useCallback(() => {
    setIsOpenProfileForm(true);
  }, []);

  return (
    <ContentContainer>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <ButtonsBar onBackNavigate />
        <div>Личный кабинет</div>
      </div>
      <ProfileContainer>
        <div style={{ display: "flex", gap: "50px", alignItems: "center" }}>
          <img src={authUser?.avatar} alt='аватар пользователя' />
          <div>{authUser?.login}</div>
        </div>
        <div style={{ display: "flex", gap: "50px", alignItems: "center" }}>
          Подпись: <MarkdownView source={authUser?.signature} className='markdownView' />
        </div>
        {/* <MarkdownEditor.Markdown source={authUser?.signature} /> */}
      </ProfileContainer>
      <button onClick={editBtn}>Редактировать профиль</button>

      <ProfileForm isOpenProfileForm={isOpenProfileForm} setIsOpenProfileForm={setIsOpenProfileForm} />
    </ContentContainer>
  );
};

export default Profile;
