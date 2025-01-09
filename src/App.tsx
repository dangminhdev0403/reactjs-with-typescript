import "./App.css";
import InputToDo from "./component/input.todo";

function App() {
  const name = "Dang Minh";
  const age = 20;
  const info = {
    gennder: "male",

    address: "Ha Noi",
  };

  const todos =["todo1","todo2","todo3","todo4","todo5","todo6"];
  return (
    <div className="parent">
      <div className="child"></div>
      <InputToDo name={name} age={age} info={info} minh={"minh"} />
      <ul>
       {todos.map((todo,index)=>{
        return <li key={index}>{todo}</li>
       })}
      </ul>
    </div>
  );
}

export default App;
