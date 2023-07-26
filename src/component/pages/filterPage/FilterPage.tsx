import { useState, FormEvent } from "react";
import Layout, { Content } from "antd/es/layout/layout";
import Navbar from "./Navbar";
import Sidenav from "./Sidenav";
import EmployeeCard from "./EmployeeCard";
import uuid from "react-uuid";
import jwt_Decode from "jwt-decode";
import Cookies from "js-cookie";
import * as Constants from '../../Constants';
import { Empty, Select, Spin, Button } from "antd";
import { DownloadOutlined, SendOutlined, LoadingOutlined } from "@ant-design/icons";
// import { ToastContainer } from "react-toastify";

type FormValue = {
  experience: number[];
  jobRole: string;
  location: string[];
  skills: string[];
  toggleOn: boolean;
}
type ToggleItem = {
  url: string;
}
interface Item {
  id: number;
  name: string;
}
const FilterPage = () => {
  const [enterResponse, setResponse] = useState<any[]>([]);
  const [getLoader, setLoader] = useState<boolean>(false);
  const handleSubmit = async (value: FormValue) => {
    setLoader(true);
    setJobRole(value.jobRole)
    const jwtToken: any = Cookies.get("atsUser");
    const jwtDecode: any = jwt_Decode(jwtToken);
    const id = uuid();
    setJobId(id)
    const skilsString = await value.skills.join(",");
    const locationString = await value.location.join(",");

    if (!value.toggleOn === true) {
      //External data profile
      // const url = `https://intranet.accionlabs.com/atsbackend/candidates?search_id=${id}&email_id=${jwtDecode.email}&skills=${skilsString}&exp_l=${value.experience[0]}&exp_h=${value.experience[1]}&location=${locationString}&job_title=${value.jobRole}`;

      //Live Api
      const url = `${Constants.URL}/candidates?search_id=${id}&email_id=${jwtDecode.email}&skills=${skilsString}&exp_l=${value.experience[0]}&exp_h=${value.experience[1]}&location=${locationString}&job_title=${value.jobRole}`;

      //Local API
    //  const url = `${Constants.filterSubmitUrl}?job_id=${id}&email_id=${jwtDecode.email}&skills=${skilsString}&exp_l=${value.experience[0]}&exp_h=${value.experience[1]}&location=${locationString}&job_title=${value.jobRole}`;
      try {
        const response = await fetch(url);
        const json = await response.json();
        setResponse(json);
        // setResponse(json.candidates);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        alert(error);
      }
    }
    else {
      //BenchProfile 
      const url = `${Constants.benchProfile}?job_id=${id}&email_id=${jwtDecode.email}&skills=${skilsString}&exp_l=${value.experience[0]}&exp_h=${value.experience[1]}&location=${locationString}&job_title=${value.jobRole}`;
      try {
        const response = await fetch(url);
        const json = await response.json();
        setResponse(json);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        alert(error);
      }
    }
  };
  const toggleSwitch = (id: any, toggleOn: FormValue) => {
    const newResponse = [...enterResponse];
    newResponse.forEach((each) => {
      if (each.phone === id) {
        each.skill_status = !each.skill_status;
      }
    });
    setResponse(newResponse);
  };
  const sortListByExperience = () => {
    const numAscending = [...enterResponse].sort(
      (a, b) => a.experience - b.experience
    );
    setResponse(numAscending);
  };
  const sortListByExperienceD = () => {
    const numdescending = [...enterResponse].sort(
      (a, b) => b.experience - a.experience
    );
    setResponse(numdescending);
  };
  const sortByScore = () => {
    const numAscending = [...enterResponse].sort(
      (a, b) => a.match_score - b.match_score
    );
    setResponse(numAscending);
  };
  const sortByScoreD = () => {
    const numdescending = [...enterResponse].sort(
      (a, b) => b.match_score - a.match_score
    );
    setResponse(numdescending);
  };
  const sortOption = [
    {
      value: "expAsc",
      label: "Sort by Experience Ascending",
    },
    {
      value: "expDes",
      label: "Sort by Experience Descending",
    },
    {
      value: "ScoreAsc",
      label: "Sort by Score Ascending",
    },
    {
      value: "ScoreDes",
      label: "Sort by Score Descending",
    },
  ];
  const onChangeSort = (value: string) => {
    switch (value) {
      case "expAsc":
        return sortListByExperience();
      case "expDes":
        return sortListByExperienceD();
      case "ScoreAsc":
        return sortByScore();
      default:
        return sortByScoreD();
    }
  };
  const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;
  const id = uuid();
  //Mass Email
  const [jobRoleValue, setJobRole] = useState<string>();
  const [jobId, setJobId] = useState<string>();
  const [emailMass, setEmailMass] = useState([])
  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    const jwtToken: any = Cookies.get("atsUser");
    const jwtDecode: any = jwt_Decode(jwtToken);

    fetch(`${Constants.massEmail}?job_id=${jobId}&recipient=${jwtDecode.email}&job_role=${jobRoleValue}`
      , {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        setEmailMass(response.url);
        window.open(response.url, '_blank')
      });
  };

  return (
    <Layout>
      <Navbar />
      <Layout>
        <Sidenav
          handleSubmit={handleSubmit}
        />
        {getLoader ? (
          <div className="spinner-align">
            <Spin indicator={antIcon} />
          </div>
        ) : (
          <>
            {enterResponse?.length > 0 ? (
              <Layout
                className="site-layout"
                style={{ padding: "0 24px 24px", marginLeft: "30%" }}
              >
                <Content
                  style={{
                    margin: 0,
                    minHeight: "77vh",
                  }}
                >
                  {/* download all report */}
                  <button style={{ minHeight: "1px", marginTop: "10px", background: "#ffffff", marginLeft: "6%", position: "relative", fontWeight: "bold", borderRadius: "5px", border: "none", height: "30px" }}>
                    <a
                      className="name"
                      //  onClick={handleDownload}
                      // href={`https://192.168.168.50:8000/download-report?job_id=${id}`}
                      href={`${Constants.downloadReportUrl}?job_id=${id}`}
                    >
                      <DownloadOutlined />&nbsp;
                      Download Report
                    </a></button>

                  {/* Mass Email */}
                  <Button
                    onClick={sendEmail}
                    style={{ position: "relative", marginTop: "10px", marginLeft: "4%", height: "30px" }}
                  >
                    <SendOutlined />&nbsp;
                    Send Email</Button>&nbsp;&nbsp;
                  <Select
                    placeholder="Sort by Experience and Score"
                    options={sortOption}
                    onChange={onChangeSort}
                    style={{
                      minWidth: "200px",
                      marginTop: "10px",
                      position: "relative",
                      marginLeft: "3%",
                    }}
                  />
                  <ul className="list-container">
                    {enterResponse.map((each) => (
                      <EmployeeCard
                        key={each.search_id}
                        cardValue={each}
                        toggleSwitch={toggleSwitch}
                      />
                    ))}
                  </ul>
                </Content>
              </Layout>
            ) : (
              <Empty
                style={{
                  width: "100%",
                  alignItems: "center",
                  height: "73vh",
                  marginTop: "100px",
                  marginLeft: "30%",
                }}
              />
            )}
          </>
        )}
        {/* <ToastContainer /> */}
      </Layout>
    </Layout>
  );
};
export default FilterPage;