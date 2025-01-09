import { useState } from "react";

interface IProps {
  name: string;
  age: number;
  info: {
    gennder: string;
    address: string;
  };
  minh: string;
  handleTest: (name: string) => void;
  listTodo: string[];
  setListTodo: (listTodo: string[]) => void;
}
const InputToDo = (props: IProps) => {
  const { handleTest, listTodo, setListTodo } = props;
  const [todo, setTodo] = useState("");
;

  const testClick = () => {
    handleTest(todo);

    setListTodo([...listTodo, todo]);
    setTodo("");
  };

  return (
    <div style={{ border: "1px solid red" }}>
      <h1>Add new todo</h1>
      <input
        value={todo}
        type="text"
        onChange={(e) => {
          setTodo(e.target.value);
        }}
      />
      <button onClick={() => testClick()}>Add</button>
      <br />
    
    </div>
  );
};

export default InputToDo;
