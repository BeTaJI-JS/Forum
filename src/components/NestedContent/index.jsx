import React, { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddFolderForm from "../../ui/Forms/AddFolder";
import { useSelector } from "react-redux";
import Card from "../../ui/Card";
import Table from "../../ui/Table";

const NestedContent = () => {
  const { pathname } = useLocation();
  console.log("pathname====>", pathname);
  const navigate = useNavigate();

  const forums = useSelector((state) => {
    const paths = pathname.split("/");
    const lastPath = paths[paths.length - 1];

    return state.forums.filter((el) => el.parentId === lastPath);
  });

  console.log("forums nested----->>>", forums);

  const backBtn = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <>
      <div>
        Проверка связи -этот компонент еще в стадии разработки. Продумать как
        делать испторию айдишек
      </div>
      {/* {forums?.map((forum) => (
        <Card
          key={forum.id}
          onClick={() => {
            return navigate(`/${pathname}/${forum.id}`);
          }}
        >
          <div>{forum.title}</div>
          <div>{forum.text}</div>
        </Card> */}
      {/* ))} */}
      <Table data={forums} />
      <button onClick={backBtn}>Назад </button>
    </>
  );
};

export default NestedContent;
