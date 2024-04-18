import React from "react";
import Card from "../Card";

const CardLists = ({ items }) => {
  return (
    <>
      {items.map((card, index) => (
        <Card />
      ))}
    </>
  );
};

export default CardLists;
