import { useLocation } from "react-router-dom";
import "./style.css";
import { Button, Divider } from "antd";
import {
  DownloadOutlined,
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import * as Constants from '../../Constants';

interface props {
  cardValue: any;
  toggleSwitch: any;
}
type FormValue = {
  toggleOn: boolean;
}

const EmployeeCard = ({ cardValue, toggleSwitch }: props) => {
  console.log('check', cardValue)
  console.log('check111')
  const { state } = useLocation();
  const {
    name,
    email,
    ta_email,
    file_created,
    phone,
    location,
    experience,
    skills,
    match_score,
    skill_status,
    filenames,
    toggleOn,
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

  // External color divided
  let bgColor;
  const cardDated = (file_created: Date, currentDate: Date) => {
    return currentDate.getMonth() - file_created.getMonth() +
      (12 * (currentDate.getFullYear() - file_created.getFullYear()))
  }
  var monthCount = cardDated(new Date(file_created), new Date())
  //console.log(monthCount)

  if (monthCount <= 1) {
    bgColor = "#d9ead3"  //green
  }
  else if (monthCount >= 2 && monthCount <= 5) {
    bgColor = "#fff2cc"  //yellow
  }
  else if (monthCount >= 6) {
    bgColor = "#f9cb9c"   //orange
  }

  // Internal color coding
  let internalColor;
  let today: string = new Date().toISOString().slice(0, 10);
  const startDate = new Date(file_created).toLocaleDateString('en-CA')
  const endDate: string = today;
  const diffInMs: number = new Date(endDate).getTime() - new Date(startDate).getTime();
  const diffInDays: number = diffInMs / (1000 * 60 * 60 * 24);
  //console.log(diffInDays);
  if (diffInDays && diffInDays <= 21) {
    internalColor = "#d9ead3"; // green
  } else if (diffInDays && diffInDays >= 22 && diffInDays <= 42) {
    internalColor = "#fff2cc"; // yellow
  } else if (diffInDays && diffInDays >= 43) {
    internalColor = "#f9cb9c"; // orange
  }

  return (
    // bgColor- external colour code, internalColour- internal bench colour
    // {/* background: experience==='1.2'?'red':'black' */}
    <li id="monthed" className="form-container" style={{ marginTop: "40px", background: !toggleOn === true ? internalColor : bgColor }}>
      <div className="header-container">
        <p className="name">
          <strong>{name}</strong>
        </p>
        <a
          className="name"
          //   href={`http://192.168.168.50:8000/profile/${filenames}`}
          href={`${Constants.fileDownloadUrl}/${filenames}`}
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

      {/* Created file date */}
      <div className="mail-container">
        <p className="heading">Created File :</p>
        <p className="para match-score">{new Date(
          file_created
        ).toLocaleDateString('en-GB')}
          {" "}
          {new Date(
            file_created
          ).toLocaleTimeString()}
        </p>

      </div>
      <p className="heading">Skills :</p>
      <ul className="list-of-skills">
        {skillArrayPass.map((eachSkill) => (
          <li className="each-skill para-mail">{eachSkill}</li>
        ))}
      </ul>
      <Button
        style={{ marginTop: "10px", background: !toggleOn === true ? internalColor : bgColor, border: "none" }}
        onClick={() => {
          toggleSwitch(phone);
        }}
        block
      >
        {skill_status ? 'View Less' : 'View More'}
      </Button>
    </li>
  );
};
export default EmployeeCard;