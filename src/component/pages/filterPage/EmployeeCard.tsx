import React, { useState, useEffect, FormEvent } from "react";
import "./style.css";
import { Button, Divider, Modal, Radio, Slider, Form } from "antd";
import * as Constants from '../../Constants';
import FilterPage from "./FilterPage";
import ReactCardFlip from "react-card-flip";
import {
  DownloadOutlined,
  DeleteOutlined,
  UserOutlined,
  PhoneOutlined, BulbOutlined, MinusCircleOutlined, InfoCircleOutlined
} from "@ant-design/icons";
//@ts-ignore
import useCountdown from 'react-use-countdown';
import parseMs from 'parse-ms'


interface props {
  cardValue: any;
  toggleSwitch: any;
}

const EmployeeCard = ({ cardValue, toggleSwitch }: props) => {
  const {
    name,
    email,
    ta_email,
    block_status,
    search_id,
    phone,
    location,
    experience,
    skills,
    match_score,
    skill_status,
    filenames,
    job_id,
    dob,
    file_created
  } = cardValue;

  let skillsArray;

  // let bgColor;
  //var diff = Math.abs(new Date() - dob);

  let skillArrayPass: any[];

  if (skills != null) {
    skillsArray = skills.split(",");
  }

  if (skill_status) {
    skillArrayPass = skillsArray;
  } else {
    skillArrayPass = skillsArray.slice(0, 4);
  }
  const [isFlipped, setIsFlipped] = useState(false);

  // card on 3 color divided

  let bgColor;
  // //bgColor="orange"

  // if(experience<=1){
  //   bgColor="#d9ead3"  //green
  // }
  // else if(experience>1.7){
  //   bgColor="#fff2cc"  //yellow
  // }
  // else{
  //   bgColor="#f9cb9c"   //orange
  // }

  // {new Date(
  //   file_created
  // ).toLocaleTimeString()}

  //  alert(file_created)
  //  2022-11-18 20:53:12
  // 16-Sep-1996
  // {new Date(file_created).toLocaleDateString()}


  const cardDated = (file_created: Date, currentDate: Date) => {
    // alert(currentDate)
    // alert(file_created.getMonth())
    return currentDate.getMonth() - file_created.getMonth() +
      (12 * (currentDate.getFullYear() - file_created.getFullYear()))
  }
  var monthCount = cardDated(new Date(2022, 1), new Date())
  console.log(monthCount)
  // alert(monthCount)
  //console.log(file_created.toLocaleTimeString());

  if (monthCount <= 1) {
    bgColor = "#d9ead3"  //green
    // #d9ead3
  }
  else if (monthCount >= 2 && monthCount <= 5) {
    bgColor = "#fff2cc"  //yellow
    // #fff2cc
  }
  else if (monthCount >= 6) {
    bgColor = "#f9cb9c"   //orange
    //#f9cb9c
  }
  const [active, setActive] = useState(false);
  const handleClickk = () => {
    setActive(!active);
  }

  const handleDelete = () => {
    fetch(
      // `https://192.168.168.50:8000/delete?job_id=${job_id}`,
      `${Constants.deleteUrl}?job_id=${job_id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {

      });
    // }, 2000)
  };
  // popup modal
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleCancel = () => {
    setOpen(false);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const [isCardVisible, setIsCardVisible] = useState(true);

  const [loginData, setLoginData] = useState({});
  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    //  const { name, value } = e.target;
    const newLoginData = Object.assign({ ...loginData });
    newLoginData[e.target.name] = e.target.value;
    setLoginData(newLoginData);
  };
  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    const url = `${Constants.blockingResumeUrl}?job_id=${job_id}&search_id=${search_id}&email_id=${ta_email}`;
    fetch(url,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...loginData, block_status: "true" }),
      }
    )
      // .then((res) => res.json())
      // .then((result) => {
      //   setLoginData({})
      //   setIsCardVisible(false);
      // });
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });

  };
  var endDate = new Date(72)
  endDate.setDate(endDate.getDate() + 2)
  const countdown = useCountdown(() => Date.now() + 10000)
  const { days, hours, minutes, seconds } = parseMs(countdown)

  return (

    <li className="form-container" id="monthed" style={{ marginTop: "40px", background: bgColor }}>

      {block_status === null || block_status === false ? (
        <div>
          <div className="header-container">
            <p className="name">
              <strong>{name}</strong>
            </p>

            {/* <a className="name" onClick={handleDelete}
            // href={`https://192.168.168.50:8000/delete?job_id=${job_id}`}
            ><strong>
                <DeleteOutlined title="delete" /></strong></a>&nbsp; */}
            <a
              className="name"
              href={`${Constants.fileDownloadUrl}/${filenames}`}
            // href={`https://192.168.168.50:8000/profile/${filenames}`}
            // href={`https://intranet.accionlabs.com/atsbackend/profile/${filenames}`}
            >
              <strong>
                <DownloadOutlined title="download" className="site-form-item-icon" />
              </strong>
            </a>&nbsp;
            {/* <a onClick={handleClickk} style={{color : active ? "red" : "green"}}><strong><BulbOutlined/></strong></a> */}
            <a
              onClick={() => setOpen(true)}
              style={{ position: "sticky", color: "#ff9188" }}
            >
              <MinusCircleOutlined title="Block" /></a>
            <Modal
              title="Block Resume"
              width={250}
              style={{ top: 20 }}
              open={open}
              onCancel={handleCancel}
              onOk={(e) => handleClick(e)}
              footer={[
                <Button key="back"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>,
                <Button key="submit" htmlType="submit" form="myForm" type="primary"
                  loading={loading}
                  //  onClick={handleOk}
                  onClick={(e) => handleClick(e)}
                >
                  Block
                </Button>,

              ]}
            >
              <Form id="myForm"
              // onSubmit={handleClick}
              >
                <div className="form-grouph">
                  <label>Project Name</label>
                  <input type="text" name="blocked_project" onChange={handleBlur} required /></div>
                <div className="form-grouph">
                  <label>Time Duration</label>
                  <div className="slidecontainer">
                    {/* <input name="blocked_time" onChange={handleBlur} type="range" min="1" max="72" step="1" style={{ width: "100%" }} id="myRange" required /> */}
                    {/* <Slider onChange={(e) => console.log('value is: ', e)} max={72} min={1} id="myRange" /> */}
                    <Form.Item name="blocked_time" rules={[{ required: true }]}>
                      <Slider
                        range
                        min={1}
                        max={72}

                      />
                    </Form.Item>
                  </div>

                  <div className="form-grouph">
                    <input type="hidden" value="true" name="block_status" />
                  </div>
                </div>
              </Form>
            </Modal>
          </div>
          <Divider style={{ margin: "0px" }} />
          <div className="mail-phone-container">
            <div className="mail-container">
              <p className="heading">
                {" "}
                <UserOutlined className="site-form-item-icon" />:
              </p>
              <p className="para-mail">{email}</p>
            </div>
          </div>

          <div className="mail-container">
            <p className="heading">
              {" "}
              <PhoneOutlined className="site-form-item-icon" />:{" "}
            </p>
            <p className="para-mail">{phone}</p>
          </div>

          <div className="mail-container">
            <p className="heading">Match Score :</p>
            <p className="para match-score">{match_score}</p>
          </div>

          <div className="mail-container">
            <p className="heading">Location :</p>
            <p className="para match-score">{location}</p>
          </div>

          <div className="mail-container">
            <p className="heading">Experience :</p>
            <p className="para match-score">{experience}</p>
          </div>
          <p className="heading">Skills :</p>
          <ul className="list-of-skills">
            {skillArrayPass.map((eachSkill) => (
              <li className="each-skill para-mail">{eachSkill}</li>
            ))}
          </ul>
          <div className="mail-container">
            <p className="heading">Created File :</p>
            <p className="para match-score">{new Date(
              file_created
            ).toLocaleDateString()}
              {" "}
              {new Date(
                file_created
              ).toLocaleTimeString()}
            </p>

          </div>
          <Button
            style={{ marginTop: "10px", background: bgColor, border: "none" }}
            onClick={() => {
              toggleSwitch(phone);
            }}
            block
          >
            View More
          </Button>
        </div>
      ) : (
        <div>
          <div className="header-container">
            <p className="name">
              <strong>{name}</strong>
            </p>
          </div><br />
          <div className="App" style={{ borderTop: "2px", textAlign: 'center' }}>
            <span>
              {days} Day : {hours} Hr : {minutes} Min : {seconds} Sec
            </span>
          </div>
        </div>
      )}

    </li>
  );
};
export default EmployeeCard;