import { useSelector } from "react-redux";

import "./App.css";

import Table from "./ui/Table";

function App() {
  // const [selectedRows, setSelectedRows] = useState([]);

  const forums = useSelector((state) => {
    return state.forums.filter(
      (el) => el.parentId === null || el.parentId === "forum",
    );
  });

  console.log("forums===>", forums);

  //! вынести  в комопнеет mainPage то чт овнутри layout - думаю да?
  return (
    <>
      <Table
        data={forums}
        // selectedRowIds={selectedRows}
        // setSelectedRows={setSelectedRows}
      />
    </>
  );
}

export default App;
