//import users.css 
import '../../styles/users.css';


const UserTable = () => {
  return (
    <div>
      <h2>Bảng với 2 cột và dữ liệu mẫu</h2>

      <table>
        <thead>
          <tr>
            <th>Cột 1</th>
            <th>Cột 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dữ liệu 1</td>
            <td>Dữ liệu A</td>
          </tr>
          <tr>
            <td>Dữ liệu 2</td>
            <td>Dữ liệu B</td>
          </tr>
          <tr>
            <td>Dữ liệu 3</td>
            <td>Dữ liệu C</td>
          </tr>
          <tr>
            <td>Dữ liệu 4</td>
            <td>Dữ liệu D</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
