import { useCallback, useState } from "react";

import { useSelector } from "react-redux";

import ButtonsBar from "components/ButtonsBar";
import { Button } from "components/ButtonsBar/styles";

import ProfileForm from "ui/Forms/Profile";
import { ContentContainer } from "ui/layout/styles";

import { MarkdownView, ProfileContainer } from "./styles";

const Profile = () => {
  const [isOpenProfileForm, setIsOpenProfileForm] = useState(false);

  const authUser = useSelector((state) => state.auth);

  const editBtn = useCallback(() => {
    setIsOpenProfileForm(true);
  }, [setIsOpenProfileForm]);

  return (
    <ContentContainer>
      <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
        <ButtonsBar onBackNavigate />

        <div style={{ color: "#194390", fontSize: "24px", fontWeight: "700", textDecoration: "underline" }}>
          Личный кабинет
        </div>
      </div>
      <ProfileContainer>
        <div style={{ alignItems: "center", display: "flex", gap: "50px", height: "200px", width: "200px" }}>
          <img src={authUser?.avatar} alt='аватар пользователя' style={{ height: "100%", width: "100%" }} />
        </div>
        <div style={{ color: "#194390", fontSize: 20, fontWeight: 700 }}>Имя пользователя: {authUser?.login}</div>
        <div
          style={{
            alignItems: "center",
            color: "#194390",
            display: "flex",
            fontSize: 20,
            fontWeight: 700,
            gap: "50px",
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
