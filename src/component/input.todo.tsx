interface IProps {
  name: string;
  age: number;
  info: {
    gennder: string;
    address: string;
  };
  minh: string;
}
const InputToDo = (props: IProps) => {
  console.log(props);
  const testClick = () => {
    alert("test ok");
  };
 
  return (
    <div>
      <div>age ={props.age}</div>
      <div>name ={props.name}</div>
      <input type="text" onChange={(e) => { alert(e.target.value)}} />
      <button onClick={() => testClick()}>Add</button>
    </div>
  );
};

export default InputToDo;
