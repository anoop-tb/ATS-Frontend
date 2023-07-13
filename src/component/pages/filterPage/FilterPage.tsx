import React, { FormEvent, useState } from "react";
import Layout, { Content } from "antd/es/layout/layout";
import Navbar from "./Navbar";
import Sidenav from "./Sidenav";
import EmployeeCard from "./EmployeeCard";
import uuid from "react-uuid";
import jwt_Decode from "jwt-decode";
import Cookies from "js-cookie";
import { DownloadOutlined, SendOutlined, PaperClipOutlined, LoadingOutlined } from "@ant-design/icons";
import { Empty, Select, Spin, Form, Button, Modal } from "antd";
import { display } from "@mui/system";
import Pagination from "@mui/material/Pagination";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import * as Constants from '../../Constants';
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import 'react-multi-email/dist/style.css';
import { Editor } from "@tinymce/tinymce-react";
import { ToggleButton } from "@mui/material";
import emailjs from '@emailjs/browser';
import type { FormInstance } from "antd/es/form";

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
     //const url = `${Constants.filterSubmitUrl}?search_id=${id}&email_id=${jwtDecode.email}&skills=${skilsString}&exp_l=${value.experience[0]}&exp_h=${value.experience[1]}&location=${locationString}&job_title=${value.jobRole}`;
    const url = `${Constants.filterSubmitUrl}?job_id=${id}&email_id=${jwtDecode.email}&skills=${skilsString}&exp_l=${value.experience[0]}&exp_h=${value.experience[1]}&location=${locationString}&job_title=${value.jobRole}`;
    
   // const url = `https://intranet.accionlabs.com/atsbackend/candidates?search_id=${id}&email_id=${jwtDecode.email}&skills=${skilsString}&exp_l=${value.experience[0]}&exp_h=${value.experience[1]}&location=${locationString}&job_title=${value.jobRole}`;
    //const url = `https://192.168.168.50:8000/candidates?search_id=${id}&email_id=${jwtDecode.email}&skills=${skilsString}&exp_l=${value.experience[0]}&exp_h=${value.experience[1]}&location=${locationString}&job_title=${value.jobRole}`;

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

  // pagination for data
  const [page, setPage] = useState(1);
  const [pageDetails, setPageDetails] = useState({});
  const handlePage = () => {
    //setPage(value);
  }

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

  const clearEmail = () => {
    window.location.reload();
  }

  const id = uuid();
  // Download All Report
  // const handleDownload = () => {
  //   const id = uuid();
  //   const url=`https://192.168.168.50:8000/download-report?job_id=${id}`
  //   fetch(
  //     url,
  //   )
  // };
  // const toolbarButtons = [
  //   "undo",
  //   "redo",
  //   "bold",
  //   "underline",
  //   "italic",
  //   "strike",
  //   "subscript",
  //   "superscript",
  //   "font",
  //   "fontSize",
  //   "color",
  //   "hiliteColor",
  //   "align",
  //   "list",
  //   "lineHeight",
  //   "outdent",
  //   "indent",
  //   "image",
  //   "video",
  //   "audio",
  //   "fullScreen",
  //   "showBlocks",
  // ];

  // const mailList = [
  //   "aakashdeep9830@gmail.com",
  //   "aakashdeep983@gmail.com"
  // ];

  const mailList = [
    "sandeep.ns@accionlabs.com",
    "anoop.tb@accionlabs.com",
    "babu.raj@accionlabs.com",
    "muhammed.samsheer@accionlabs.com",
    "rakshitha.ts@accionlabs.com",
  ];

  const [emails, setEmails] = React.useState<string[]>([]);
  const [focused, setFocused] = React.useState(false);

  const email = 'aakash.deep@accionlabs.com';
  const encodedEmail = encodeURIComponent(email);
  const url = `https://formsubmit.co/${encodedEmail}`
 
  const sendEmail = (e: FormEvent) => {

    e.preventDefault();

    emailjs.sendForm('service_r16vh17', 'template_ihhtiwj', e.target as HTMLFormElement, 'XFfoPohn7gaHIUGmZ')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  };

//   const express = require("express");
// const nodemailer = require("nodemailer");
// const app = express();
// require("dotenv").config();

//   let transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       type: "OAuth2",
//       user: process.env.EMAIL,
//       pass: process.env.WORD,
//       clientId: process.env.OAUTH_CLIENTID,
//       clientSecret: process.env.OAUTH_CLIENT_SECRET,
//       refreshToken: process.env.OAUTH_REFRESH_TOKEN,
//     },
//    });
//    transporter.verify((err: Error, success: String) => {
//     err
//       ? console.log(err)
//       : console.log(`=== Server is ready to take messages: ${success} ===`);
//    });
//   let mailOptions = {
//     from: "aakash.deep@accionlabs.com",
//     to: process.env.EMAIL,
//     subject: "Nodemailer API",
//     text: "Hi from your nodemailer API",
//    };
//    const sendEmail = (e: FormEvent) => {
//     e.preventDefault();
//    transporter.sendMail(mailOptions, function (err : Error, data: String) {
//     if (err) {
//       console.log("Error " + err);
//     } else {
//       console.log("Email sent successfully");
//     }
//    });
//   }
// const port = 3001;
// app.listen(port, () => {
//  console.log(`Server is running on port: ${port}`);
// });

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

                  <Button
                    onClick={() => setOpen(true)} style={{ position: "relative", marginTop: "10px", marginLeft: "4%", height: "30px" }}
                  >
                    <SendOutlined />&nbsp;
                    Send Email</Button>
                  <Modal
                    title="Compose Mail"
                    style={{ top: 20 }}
                    open={open}
                    onCancel={handleCancel}
                    onOk={handleOk}
                    footer={[
                      <Button key="back" onClick={handleCancel}>
                        Cancel
                      </Button>,
                      // <Button key="submit" htmlType="submit" form="myForm" type="primary" loading={loading} onClick={handleOk}>
                      <Button key="submit" htmlType="submit" form="myForm" type="primary" loading={loading} onClick={handleOk}>
                        Send
                      </Button>,
                    ]}
                  >
                    {/* <form  encType="multipart/form-data" id="myForm"  action={url} method="POST" >
                      <input type="hidden" name="email" value="aakash.deep@accionlabs.com"/>
                      <input type="hidden" name="_footer" value="AccionLabs"/>
                      <input type="hidden" name="_from" value="aakash.deep@accionlabs.com"/>
                      <input type="hidden" name="_autoresponse" value="your custom message"></input>
                      <input type="hidden" name="_cc" value={mailList}/>
                      <input type="hidden" name="_subject" value="AccionLabs Talent Search!"></input>
                      <input type="text" name="_honey" style={{display:"none"}}/>       
                      <input type="hidden" name="_captcha" value="false"/>
                      <input type="hidden" name="_blacklist" value="spammy pattern, banned term, phrase"/>
                      <input type="hidden" name="_template" value="table"/>
                      <div className="form-grouph">
                        <label htmlFor="subject">Subject :</label>
                        <input type="text" id="subject" name="Subject" required />
                      </div>
                      <div className="form-grouph">
                        <label htmlFor="body">Body :</label>

                        <SunEditor
                          setAllPlugins={false}       
                             
                          hideToolbar={true}
                          height="210px" name="Description"
                          setOptions={{
                            imageAccept: ".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf",
                            imageFileInput: true,
                            imageMultipleFile: true,
                            buttonList: [
                              ['undo', 'redo'],
                              ['bold', 'underline', 'italic', 'list'],
                              ['table', 'link', 'image'],
                              ['fullScreen'],
                            ],
                          }}
                        />
                        <textarea name="Description" contentEditable="true" style={{height:"210px"}}
                        
                        />
                      </div>
                      <div className="form-grouph">
                        <label htmlFor="body"><PaperClipOutlined /> Attachment :</label>
                        <input style={{ border: "none" }}
                          accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                          type="file" multiple  name="Attachment" required
                        /></div>
                    </form> */}

                     <form
                      id="myForm" encType="multipart/form-data"
                      onSubmit={sendEmail}
                    >
                       {/* <input  name="_cc"  /> */}
                       <input type="hidden"  name="_cc"  value={mailList}/>
                      <div className="form-grouph">
                        <label>Subject</label>
                        <input type="hidden" name="email" value="aakash.deep@accionlabs.com"/>
                        <input type="text" name="subject" required /></div>
                      <div className="form-grouph">
                        <label>Description</label>
                        <SunEditor 
                          //toolbarButtons={toolbarButtons}
                          //dangerouslySetInnerHTML={{ __html: "<h1>Hi there!</h1>" }}
                          
                          setAllPlugins={false}
                          hideToolbar={true} 
                          height="210px" name="message" 
                        />
                         {/* <textarea name="message" contentEditable="true" style={{height:"210px"}}/> */}
                        {/* <div className="form-grouph">
                        <label htmlFor="body"><PaperClipOutlined /> Attachment :</label>
                        <input style={{ border: "none" }}
                          accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                          type="file" multiple  name="Attachment" required
                        /></div> */}
                      </div>
                    </form>
                    
                  </Modal>&nbsp;&nbsp;
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
                <div className="d-sm-flex text-center justify-content-between align-item-center">
                  <div style={{ position: "absolute", marginLeft: "50px" }}>
                    Page:{page}
                  </div>
                </div>
                <Pagination style={{ marginLeft: "50%", display: "block" }} count={10} page={page} onChange={handlePage} />
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