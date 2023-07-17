import { useState } from "react";
import Layout, { Content } from "antd/es/layout/layout";
import Navbar from "./Navbar";
import Sidenav from "./Sidenav";
import EmployeeCard from "./EmployeeCard";
import uuid from "react-uuid";
import jwt_Decode from "jwt-decode";
import Cookies from "js-cookie";
import * as Constants from '../../Constants';
import { Empty, Select, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface FormValue {
  experience: number[];
  jobRole: string;
  location: string[];
  skills: string[];
}

const FilterPage = () => {
  const [enterResponse, setResponse] = useState<any[]>([]);
  const [getLoader, setLoader] = useState<boolean>(false);

  const handleSubmit = async (value: FormValue) => {
    setLoader(true);
    const jwtToken: any = Cookies.get("atsUser");
    const jwtDecode: any = jwt_Decode(jwtToken);
    const id = uuid();
    const skilsString = await value.skills.join(",");
    const locationString = await value.location.join(",");
   
   // const url = `https://intranet.accionlabs.com/atsbackend/candidates?search_id=${id}&email_id=${jwtDecode.email}&skills=${skilsString}&exp_l=${value.experience[0]}&exp_h=${value.experience[1]}&location=${locationString}&job_title=${value.jobRole}`;

     // //Local API
    const url = `${Constants.filterSubmitUrl}?job_id=${id}&email_id=${jwtDecode.email}&skills=${skilsString}&exp_l=${value.experience[0]}&exp_h=${value.experience[1]}&location=${locationString}&job_title=${value.jobRole}`;
   
    //Live Api
    //const url = `${Constants.URL}/candidates?search_id=${id}&email_id=${jwtDecode.email}&skills=${skilsString}&exp_l=${value.experience[0]}&exp_h=${value.experience[1]}&location=${locationString}&job_title=${value.jobRole}`;
    try {
      const response = await fetch(url);
      const json = await response.json();
      setResponse(json);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      alert(error);
    }
  };

  const toggleSwitch = (id: any) => {
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

  return (
    <Layout>
      <Navbar />
      <Layout>
        <Sidenav handleSubmit={handleSubmit} />
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
                  <Select
                    placeholder="Sort by Experience and Score"
                    options={sortOption}
                    onChange={onChangeSort}
                    style={{
                      minWidth: "200px",
                      marginTop: "15px",
                      marginRight: "15px",
                      marginLeft: "67%",
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
      </Layout>
    </Layout>
  );
};

export default FilterPage;
