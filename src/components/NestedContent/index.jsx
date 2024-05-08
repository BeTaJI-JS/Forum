import React, { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import Table from "../../ui/Table";

const NestedContent = () => {
  const forumsData = useSelector((state) => state.forums);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const forums = useMemo(() => {
    const paths = pathname.split("/");
    const lastPath = paths[paths.length - 1];
    return forumsData.filter((el) => el.parentId === lastPath);
  });

  console.log("pathname NestedContent====>", pathname);
  console.log("forums nested----->>>", forums);

  const backBtn = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <>
      <Table data={forums} />
      <button onClick={backBtn}>Назад </button>
    </>
  );
};

export default NestedContent;
