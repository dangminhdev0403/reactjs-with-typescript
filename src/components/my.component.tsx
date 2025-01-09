const MyFirstComponent = () => {
  const name = "Dang Minh";
  const info = {
    name: "Dang Minh",
    age: 20,
  };

  const array = [1, 2, 3, 4, 5];
  const isTrue = true;
  return (
    <div>
      <h1 style={{"color": "red"}}>Hello World{JSON.stringify(info)}</h1>
    <h2>
        {array.map((item, index) => {
          return <p key={index}>{item}</p>;
        })}
        {isTrue ? "true" : "false"}
    </h2>
      hello {name}
    </div>
  );
};

export default MyFirstComponent;
