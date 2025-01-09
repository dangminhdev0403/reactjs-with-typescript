//import users.css
import { useEffect, useState } from "react";
import "../../styles/users.css";

interface IUser{
  id:number;
  name:string;
  email:string;
  gender:string;
}
const UserTable = () => {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    console.log("check useEffect");

    getData();
  }, []);


  const getData = async () => {
    const access_token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJwZXJtaXNzaW9uIjpbIlJPTEVfQURNSU5fQ1JFQVRFIiwiUk9MRV9BRE1JTl9VUERBVEUiXSwiZXhwIjoxNzQ1MDk1ODExLCJpYXQiOjE3MzY0NTU4MTEsInVzZXIiOnsiaWQiOjEsIm5hbWUiOiJJJ20gc3VwZXIgYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSJ9fQ.FsebO4mxxFWV2W4WEhc7q_WC0RS0MXgGrx8kkKn2Isfk5fgshn4__YwLXBFozxOZi8Gu0nOd2xpBIO6mCZcRoA";
    const res = await fetch("http://127.0.0.1:8080/api/v1/users", {
      method: "GET",
      //fetch with beartoken
      headers: {
        Authorization: `Bearer ${access_token}`,
        "COntent-Type": "application/json",
      },
    });

    const d = await res.json();

    setListUsers(d.data.result);
  };

  return (
    <div>
      <h2>Bảng với 2 cột và dữ liệu mẫu</h2>

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>email</th>
            <th>gender</th>
          </tr>
        </thead>
        <tbody>
          {listUsers.map((item: IUser) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
