import React from "react";
import { CardWrapper } from "./styles";

const Card = ({ children, onClick }) => {
  return <CardWrapper onClick={onClick}>{children}</CardWrapper>;
};

export default Card;
