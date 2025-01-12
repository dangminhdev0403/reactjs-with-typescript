// import "../../styles/users.css";
import { Checkbox, Form, Input, Modal, notification } from "antd";

interface IProps {
  access_token: string;
  getData: () => Promise<void>;
  isCreateModelOpen: boolean;
  setIsCreateModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateUserModel = (props: IProps) => {
  const [form] = Form.useForm();

  const { access_token, getData, isCreateModelOpen, setIsCreateModelOpen } =
    props;

  const hanldeCloseCreateModel = () => {
    form.resetFields();
    setIsCreateModelOpen(false);
  };

  const onFinish = async (values: any) => {
    console.log("Success:", values);

    const { name, email, password } = values;
    const data = {
      name,
      email,
      password,
    };

    const res = await fetch("http://127.0.0.1:8080/api/v1/users", {
      method: "POST",
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

  return (
    <Modal
      title="Add  new User"
      open={isCreateModelOpen}
      onOk={() => form.submit()}
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

        <Form.Item name="remember" valuePropName="checked" label={null}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form>

   
    </Modal>
  );
};

export default CreateUserModel;
