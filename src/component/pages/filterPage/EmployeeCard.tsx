import React from "react";
import "./style.css";
import { Button, Divider } from "antd";
import {
  DownloadOutlined,
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

interface props {
  cardValue: any;
  toggleSwitch: any;
}

const EmployeeCard = ({ cardValue, toggleSwitch }: props) => {
  const {
    name,
    email,
    phone,
    location,
    experience,
    skills,
    match_score,
    skill_status,
    filenames,
  } = cardValue;

  let skillsArray;

  let skillArrayPass: any[];

  if (skills != null) {
    skillsArray = skills.split(",");
  }

  if (skill_status) {
    skillArrayPass = skillsArray;
  } else {
    skillArrayPass = skillsArray.slice(0, 4);
  }

  return (
    <li className="form-container" style={{ marginTop: "40px" }}>
      <div className="header-container">
        <p className="name">
          <strong>{name}</strong>
        </p>
        <a
          className="name"
          href={`http://192.168.168.50:8000/profile/${filenames}`}
        >
          <strong>
            <DownloadOutlined className="site-form-item-icon" />
          </strong>
        </a>
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
      <Button
        style={{ marginTop: "10px" }}
        onClick={() => {
          toggleSwitch(phone);
        }}
        block
      >
        View More
      </Button>
    </li>
  );
};

export default EmployeeCard;
