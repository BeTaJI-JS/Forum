import styled from "styled-components";
import MarkdownEditor from "@uiw/react-markdown-editor";

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 0 auto;

  gap: 20px;
`;

export const MarkdownView = styled(MarkdownEditor.Markdown)`
  background-color: #c6d9e3;
  color: black;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px;
`;
