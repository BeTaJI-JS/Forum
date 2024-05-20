import { useSelector } from "react-redux";

import "./App.css";

import Table from "./ui/Table";
import { useMemo } from "react";

function App() {
  const forumsData = useSelector((state) => state.forums);

  const forums = useMemo(() => {
    return forumsData.filter((el) => el.parentId === null || el.parentId === "/Forum/");
  });
  // можно переделать слайс на словарь айдишников( в качетсве ключей) и использовать их тут
  // преименовать слайс форумов на что-нибудь более подходящее

  console.log("forums mainPage===>", forums);

  //! вынести  в комопнеет mainPage то чт овнутри layout - думаю да?
  return (
    <>
      <Table data={forums} />
    </>
  );
}

export default App;
