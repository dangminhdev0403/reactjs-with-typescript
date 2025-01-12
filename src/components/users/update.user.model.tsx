import { useEffect, useState } from "react";
// import "../../styles/users.css";
import { Form, Input, Modal, notification } from "antd";
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
  const {
    access_token,
    getData,
    isUpdateModelOpen,
    setIsUpdateModelOpen,
    dataUpdate,
    setDataUpdate,
  } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue(dataUpdate);
      setName(dataUpdate.name);
      setEmail(dataUpdate.email);
    }
  }, [dataUpdate]);
  const handleOk = async (data: object) => {
    const res = await fetch("http://127.0.0.1:8080/api/v1/users", {
      method: "PUT",
      // send data
      body: JSON.stringify(data),
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
    form.resetFields();
  };
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    console.log("Success:", values);
    const { name, email, password } = values;
    const data = {
      id: dataUpdate?.id,
      name,
      email,
      password,
    };
    handleOk(data);
  };

  return (
    <Modal
      title="Update  a User"
      open={isUpdateModelOpen}
      onOk={()=>{form.submit()}}
      onCancel={() => {
        hanldeCloseCreateModel();
      }}
      maskClosable={false}
    >
      <Form
       
        form={form}
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateUserModel;
