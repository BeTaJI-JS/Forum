import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

import Table from "../../ui/Table";
import "../../App.css";

const NestedContent = () => {
  const forumsData = useSelector((state) => state.forums);

  const { pathname } = useLocation();

  const forums = useMemo(() => {
    return forumsData.filter((el) => el.parentId === pathname);
  }, [forumsData, pathname]);

  return (
    <>
      <Table data={forums} />
    </>
  );
};

export default NestedContent;
