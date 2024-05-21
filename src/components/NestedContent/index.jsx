import { useMemo } from "react";

import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import Table from "ui/Table";
import "../../App.css";

const NestedContent = () => {
  const forumsData = useSelector((state) => state.forums);

  const { pathname } = useLocation();

  const forums = useMemo(() => forumsData.filter((el) => el.parentId === pathname), [forumsData, pathname]);

  return <Table data={forums} />;
};

export default NestedContent;
