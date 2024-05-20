import styled from "styled-components";

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #c5c4c4;
  font-size: 20px;
  padding: 20px;
  align-items: center;
  border-radius: 10px;
`;

export const Logo = styled.div`
  max-width: 100px;
  max-height: 100px;

  & > img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export const TitleGM = styled.h1`
  font-size: 40px;
  color: #194390;
`;

export const LogOutBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: #194390;
  font-size: 20px;
  font-weight: 700;
`;

export const HeaderTabs = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  color: #194390;
  font-size: 24px;
  font-weight: 700;

  & > svg:hover {
    cursor: pointer;

    & > path {
      fill: #194390;
    }
  }
`;

export const AuthName = styled.div`
  font-size: 16px;
  font-style: italic;
  max-width: 160px;
  word-wrap: break-word;
`;
