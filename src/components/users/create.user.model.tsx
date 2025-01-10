import { useState } from "react";
// import "../../styles/users.css";
import { Input, Modal, notification } from "antd";

interface IProps {
  access_token: string;
  getData: () => Promise<void>;
  isCreateModelOpen: boolean;
  setIsCreateModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateUserModel = (props: IProps) => {
  const { access_token, getData, isCreateModelOpen, setIsCreateModelOpen } =
    props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOk = async () => {
    const data = {
      name,
      email,
      password,
    };

    const res = await fetch("http://127.0.0.1:8080/api/v1/users", {
      method: "POST",
      // send data
      body: JSON.stringify({ ...data }),
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
    setIsCreateModelOpen(false);
    setName("");
    setEmail("");
    setPassword("");
  };
  return (
    <Modal
      title="Add  new User"
      open={isCreateModelOpen}
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

export default CreateUserModel;
