import { useState } from "react";

import "./App.css";
import Layout from "./ui/layout";
import { forums } from "./data/tree";
import Card from "./ui/Card";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Layout>
      {/* <div>Запись форума 1</div>
      <div>Запись форума 2</div>
      <div>Запись форума 3</div>
      <div>Запись форум 4а</div>
      <div>Запись форума 5</div>
      <div>Запись форума 6</div> */}
      {forums.map((forum) => (
        <Card key={forum.id}>{forum.name}</Card>
      ))}
    </Layout>
  );
}

export default App;
