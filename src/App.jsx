import { useMemo } from "react";

import { useSelector } from "react-redux";

import "./App.css";

import Table from "./ui/Table";



function App() {
  const forumsData = useSelector((state) => state.forums);

  const forums = useMemo(() => forumsData.filter((el) => el.parentId === null || el.parentId === "/Forum/"),[forumsData]);
  //! вынести  в комопнеет mainPage то чт овнутри layout - думаю да?
  return (
    <Table data={forums} />
  );
}

export default App;
