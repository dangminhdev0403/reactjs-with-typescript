import { useEffect, useState } from "react";
// import "../../styles/users.css";
import { Input, Modal, notification } from "antd";
import { IUser } from "./user.table";

interface IProps {
  access_token: string;
  getData: () => Promise<void>;
  isUpdateModelOpen: boolean;
  setIsUpdateModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dataUpdate: null | IUser;
  setDataUpdate: React.Dispatch<React.SetStateAction<any>>;
}
const UpdateUserModel = (props: IProps) => {
  const { access_token, getData, isUpdateModelOpen, setIsUpdateModelOpen ,dataUpdate,setDataUpdate} =  props;
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (dataUpdate) {
      setName(dataUpdate.name);
      setEmail(dataUpdate.email);
      setPassword(dataUpdate.password);
            console.log(dataUpdate);

    }
  }, [dataUpdate]);
  const handleOk = async () => {
    const data = {
      id: dataUpdate?.id,
      name,
      email,
     password
    };

    console.log(data.id);
    
    const res = await fetch("http://127.0.0.1:8080/api/v1/users", {
      method: "PUT",
      // send data
      body: JSON.stringify( data ),
      //fetch with beartoken
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    const d = await res.json();

    if (d.data) {
      await getData();
      notification.success({
        message: "Success",
        description: JSON.stringify(d.message),
      });
    } else {
      notification.error({
        message: "Error",
        description: JSON.stringify(d.message),
      });
    }
  };

  const hanldeCloseCreateModel = () => {
    setIsUpdateModelOpen(false);
    setDataUpdate(null);
    setName("");
    setEmail("");
    setPassword("");

  };
  return (
    <Modal
      title="Create  a User"
      open={isUpdateModelOpen}
      onOk={handleOk}
      onCancel={() => {
        hanldeCloseCreateModel();
      }}
      maskClosable={false}
    >
      <label htmlFor="name">Name:</label>
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="email">Email:</label>
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <Input
        placeholder="passsword"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </Modal>
  );
};

export default UpdateUserModel;
