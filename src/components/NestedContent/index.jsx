import React, {  useMemo } from "react";
import { useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

import Table from "../../ui/Table";

const NestedContent = () => {
  const forumsData = useSelector((state) => state.forums);

  const { pathname } = useLocation();


  const forums = useMemo(() => {
    const paths = pathname.split("/");
    const lastPath = paths[paths.length - 1];
    return forumsData.filter((el) => el.parentId === pathname);
  },[forumsData, pathname]);

  console.log("pathname NestedContent====>", pathname);
  console.log("forums nested----->>>", forums);



  return (
    <>
      <Table data={forums} />
    </>
  );
};

export default NestedContent;
