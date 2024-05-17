import styled from "styled-components";
import MarkdownEditor from "@uiw/react-markdown-editor";

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
  gap: 20px;
`;

export const MarkdownView = styled(MarkdownEditor.Markdown)`
  background-color: #fafafa4a;
  color: black;
  font-size: 14px;
`;
