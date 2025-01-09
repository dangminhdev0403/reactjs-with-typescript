import { useState } from "react";
import "./App.css";
import InputToDo from "./components/input.todo";

function App() {
  const name = "Dang Minh";
  const age = 20;
  const info = {
    gennder: "male",
    address: "Ha Noi",
  };

  const handleTest = (name: string) => {};

  const [listTodo, setListTodo] = useState([
    "todo1",
    "todo2",
    "todo3",
    "todo4",
  ]);
  return (
    <div className="parent">
      <div className="child"></div>
      <InputToDo
        name={name}
        age={age}
        info={info}
        minh={"minh"}
        handleTest={handleTest}
        listTodo={listTodo}
        setListTodo={setListTodo}
      />
      <ul>
        {listTodo.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
