import { Button as ButtonAntD } from "antd";
import styled from "styled-components";

export const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  font-size: 20px;
  align-items: center;
`;

export const TextTag = styled.div`
  padding: 10px;
  font-size: 24px;
  font-weight: 700;
  color: #194390;
`;

export const Button = styled(ButtonAntD)`
  width: 200px;
  border-radius: 10px;
  color: white;
  background-color: #194390;
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
    background-color: #5c93cc !important;
    color: white !important;
  }
`;
