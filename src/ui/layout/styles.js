import styled from "styled-components";

export const Header = styled.div`
  border: 1px solid red;
  display: flex;
  justify-content: space-between;
  background-color: #8f8fc4;
  color: red;
  font-size: 20px;
  padding: 20px;
  align-items: center;
`;

export const ContentContainer = styled.div`
  border: 4px solid #5C93CC;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  box-sizing: border-box;
  gap: 10px;
  color: black;
  background-color: #dee6eb;
  overflow-y: auto;
  max-height: 80vh;
};
`;
