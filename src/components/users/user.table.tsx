//import users.css
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
// import "../../styles/users.css";
import { SearchOutlined } from "@ant-design/icons";
import { Button, notification, Popconfirm } from "antd";
import Table from "antd/es/table";
import CreateUserModel from "./create.user.model";
import UpdateUserModel from "./update.user.model";

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  gender: string;
}
const access_token = localStorage.getItem("access_token") as string;

const UserTable = () => {
  const [listUsers, setListUsers] = useState([]);
  const [isCreateModelOpen, setIsCreateModelOpen] = useState(false);
  const [isUpdateModelOpen, setIsUpdateModelOpen] = useState(false);

  const [dataUpdate, setDataUpdate] = useState<null | IUser>(null);

  const [meta, setMeta] = useState({
    page: 1,
    pageSize: 5,
    totalPage: 0,
    pages: 0,
  });
  useEffect(() => {
    // console.log("check useEffect");

    getData();
  }, []);

  const getData = async () => {
    const res = await fetch(
      `http://127.0.0.1:8080/api/v1/users?page=${meta.page}&size=${meta.pageSize}`,
      {
        method: "GET",
        //fetch with beartoken
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const d = await res.json();
    if (!d.data) {
      notification.error({
        message: "Error",
        description: JSON.stringify(d.message),
      });
      return;
    }

    setListUsers(d.data.result);
    setMeta({
      page: d.data.meta.page,
      pageSize: d.data.meta.pageSize,
      totalPage: d.data.meta.totalPage,
      pages: d.data.meta.pages,
    });
  };

  const confirm = async (user: IUser) => {
    try {
      const res = await fetch(`http://127.0.0.1:8080/api/v1/users/${user.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      });

      const d = await res.json(); // Giải mã dữ liệu JSON từ phản hồi

      if (res.ok) {
        await getData(); // Lấy lại dữ liệu người dùng sau khi xóa thành công
        notification.success({
          message: "Success",
          description: d.message || "User deleted successfully.", // Hiển thị thông báo thành công
        });
      } else {
        notification.error({
          message: "Error",
          description:
            d.message || "An error occurred while deleting the user.", // Hiển thị thông báo lỗi nếu có
        });
      }
    } catch (error: unknown) {
      // Định kiểu là 'unknown' và ép kiểu trong catch block
      if (error instanceof Error) {
        // Kiểm tra xem error có phải là một instance của Error không
        notification.error({
          message: "Error",
          description:
            error.message ||
            "Something went wrong during the delete operation.",
        });
      } else {
        notification.error({
          message: "Error",
          description: "An unknown error occurred.",
        });
      }
    }
  };

  const colunms: ColumnsType<IUser> = [
    {
      title: "Email",
      dataIndex: "email",
      render(value, record, index) {
        return <a>{record.email}</a>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    // row Action
    {
      title: "Action",
      render: (value, record) => {
        return (
          <div>
            <button
              onClick={() => {
                // lấy thông tin đúng r

                setIsUpdateModelOpen(true);
                setDataUpdate(record);
                console.log(record);
              }}
            >
              Edit
            </button>
            <Popconfirm
              title="Delete the task"
              description={`"Are you sure to delete this user name = ${record.name}?"`}
              onConfirm={() => confirm(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger style={{ marginLeft: "10px" }}>
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const hanldeOnChange = async (page: number, pageSize: number) => {
    // setMeta({ ...meta, page, pageSize });

    const res = await fetch(
      `http://127.0.0.1:8080/api/v1/users?page=${page}&size=${pageSize}`,
      {
        method: "GET",
        //fetch with beartoken
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const d = await res.json();
    if (!d.data) {
      notification.error({
        message: "Error",
        description: JSON.stringify(d.message),
      });
      return;
    }

    setListUsers(d.data.result);
    setMeta({
      page: d.data.meta.page,
      pageSize: d.data.meta.pageSize,
      totalPage: d.data.meta.totalPage,
      pages: d.data.meta.pages,
    });
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {" "}
        <h2>Bảng với 2 cột và dữ liệu mẫu</h2>{" "}
        <div>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={() => setIsCreateModelOpen(true)}
          >
            Add
          </Button>
        </div>
      </div>
      <Table
        pagination={{
          showSizeChanger: true,
          onChange: (page: number, pageSize: number) =>
            hanldeOnChange(page, pageSize),
          current: meta.page,
          pageSize: meta.pageSize,
          total: meta.totalPage,
          //show total with antd
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
        }}
        columns={colunms}
        dataSource={listUsers}
        rowKey={"id"}
      />
      <CreateUserModel
        access_token={access_token}
        getData={getData}
        isCreateModelOpen={isCreateModelOpen}
        setIsCreateModelOpen={setIsCreateModelOpen}
      />
      <UpdateUserModel
        access_token={access_token}
        getData={getData}
        isUpdateModelOpen={isUpdateModelOpen}
        setIsUpdateModelOpen={setIsUpdateModelOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
    </div>
  );
};

export default UserTable;
