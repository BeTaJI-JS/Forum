import styled from "styled-components";
import { Button as ButtonAntD } from "antd";

export const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  fontsize: 20px;
`;

export const Button = styled(ButtonAntD)`
  width: 200px;
  border-radius: 10px;
  color: white;
  background-color: #3757e1;
  padding: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  min-height: 50px;
  font-weight: 600;
  border: none;

  &:hover {
    background-color: #17309b;
    color: white;
  }
`;
