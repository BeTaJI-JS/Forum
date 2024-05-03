import styled from "styled-components";

export const CardWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  border: 2px solid red;
  padding: 10px;
  font-size: 20px;
  font-weight: 600;
  box-shadow: 1px 2px 2px 2px rgba(120, 158, 158, 0.59);
  border-radius: 5px;
  gap: 50px;
  min-height: 80px;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: lightblue;
  }
`;
