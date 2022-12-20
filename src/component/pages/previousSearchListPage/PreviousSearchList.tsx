import { useEffect, useState } from "react";
import { Empty, Layout, Table, Space, Tag, Popconfirm, Divider } from "antd";
import { Content } from "antd/es/layout/layout";
import type { ColumnsType } from "antd/es/table";

import * as React from "react";
import Navbar from "../filterPage/Navbar";

import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import jwt_Decode from "jwt-decode";
import Cookies from "js-cookie";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

interface ListType {
  job_id: React.Key;
  job_title: string;
  requested: string[];
}

function PreviousSearchList() {
  const [searchList, setSearchList] = useState<any[]>([]);

  useEffect(() => {
    if (searchList.length <= 0) {
      getPreviousSearchList();
    }
  });
  const navigate = useNavigate();

  const getPreviousSearchList = async () => {
    const jwtToken: any = Cookies.get("atsUser");
    const jwtDecode: any = jwt_Decode(jwtToken);
    let id = "014d6842-b5a4-cd8d-8c30-a07991cf141b";
    // let url = `http://192.168.168.50:8000/matchcase_id?id=${id}`
    let url = `http://192.168.168.50:8000/email_match?email=${jwtDecode.email}`;
    try {
      const response = await fetch(url);
      const json = await response.json();
      setSearchList(json);
    } catch (error) {
      console.log("error");
      alert(error);
    }
  };

  const deletePreviousSearchList = async (key: React.Key) => {
    let url = `http://192.168.168.50:8000/delete?job_id=${key}`;
    try {
      const response = await fetch(url, { method: "DELETE" });
      const json = await response.json();
      getPreviousSearchList();
    } catch (error) {
      console.log("error");
      alert(error);
    }
  };

  const handleDelete = (key: React.Key) => {
    deletePreviousSearchList(key);

    console.log(key);
  };

  const handleView = (key: React.Key) => {
    console.log(key);
    let link = `/previoussearchlist/${key}`;
    return navigate(link);
  };

  const columns: ColumnsType<ListType> = [
    {
      title: "Job Title",
      dataIndex: "job_title",
    },
    {
      title: "Skills",
      dataIndex: "requested",
    },

    {
      title: "Skill Searched",
      dataIndex: "requested",
      render: (_, { requested }) => (
        <>
          {requested.map((request: string) => {
            let color = request.length > 5 ? "geekblue" : "green";
            if (request === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={request}>
                {request.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },

    {
      title: "operation",
      dataIndex: "job_id",
      render: (_, record: { job_id: React.Key }) => (
        <Space>
          <Popconfirm
            title="Sure to view?"
            onConfirm={() => handleView(record.job_id)}
          >
            <a>
              <EyeOutlined />
            </a>
          </Popconfirm>
          <Divider type="vertical" />
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.job_id)}
          >
            <a>
              <DeleteOutlined />
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  return (
    <Layout>
      <Navbar />
      <Layout>
        <Content style={{ marginTop: "40px", height: "100vh" }}>
          <Table columns={columns} dataSource={searchList} />;
        </Content>
      </Layout>
    </Layout>
  );
}

export default PreviousSearchList;
