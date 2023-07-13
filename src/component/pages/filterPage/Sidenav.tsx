import React, { useState } from "react";
import { Form, Select, SelectProps, Slider, theme, Button, Tooltip, Space,Switch } from "antd";
import Sider from "antd/es/layout/Sider";
import {
  LineChartOutlined,
  PictureOutlined,
  UserOutlined,
  FireOutlined,
  FileSearchOutlined
} from "@ant-design/icons";
import type { FormInstance } from "antd/es/form";
import { ValidateErrorEntity } from "rc-field-form/es/interface";
import { click } from "@testing-library/user-event/dist/click";
import { height } from "@mui/system";
import { Box } from "@mui/material";
import type { SliderMarks } from "antd/es/slider";

interface FormValue {
  jobRole: string;
  location: string[];
  skills: string[];
  experience: number[];
}

interface props {
  handleSubmit: (value: FormValue) => any;
}

const jobRole = [
  "Full Stack Developer",
  "Web Designer",
  "Technical Lead",
  "Test Analyst",
  "QA Team Manager",
  "System Analyst",
  "Head - Quality Assurance",
  "Program Manager - Technology / IT",
  "IT Project Manager",
  "Technical Content Developer",
  "Technical Architect",
  "System Administrator / Engineer",
  "Visualiser",
  "Desktop Engineer",
  "Financial Analyst",
  "Business Analyst",
  "Accountant / Accounts Executive",
  "Network (Support) Engineer",
  "Research & Development - Other",
  "Financial Accountant",
  "IT Project Lead",
  "Functional Consultant",
  "Database Administrator",
  "Webmaster",
  "Data warehouse Developer / Engineer",
  "Non - Tech Support - Voice / Blended",
  "Database Architect / Designer",
  "Regional Manager",
  "Materials Manager",
  "MIS Manager",
  "Data Analyst",
  "Hardware Installation & Maintenance",
  "Technical Trainer",
  "QA / QC Executive",
  "Foreman / Technician",
  "Design & Development Engineer",
  "Technical Support - Voice / Blended",
  "Mobile Apps Testing Engineer",
  "Public Relations",
  "Operations Support - Other",
  "Release Manager",
  "Research Analyst",
  "Non - Tech Support - Non Voice",
  "Engineering Manager",
  "System Security Engineer",
  "Research Associate / Engineer",
  "Maintenance Engineer",
  "RF Engineering",
  "Construction Engineering - Other",
  "Process Engineer",
  "Project Manager - Manufacturing",
  "Hardware & Network - Project Management",
  "Software Development - Other",
  "Marketing Manager",
  "Procurement / Sourcing Head",
  "Non IT Recruiter",
  "Network Manager / Administrator",
  "Graphic Designer",
  "Creative / Art Director",
  "Wireless Network Engineer",
  "IT Consulting - Other",
  "Not Mentioned",
  "Technical Consultant",
  "Product Manager",
  "Office Admin",
  "HR Generalist",
  "HR Business Partner (HRBP)",
  "Employee Relations Management",
  "C & B Management",
  "Human Resources - Other",
  "Private Attorney / Lawyer",
  "Payroll Executive",
  "Industrial Relations",
  "Head - HR",
  "Data Science & Analytics - Other",
  "Finance & Accounting - Other",
  "Claims Executive",
  "Technical Support - Non Voice",
  "Data / Big Data Testing Engineer",
  "Warehouse Manager",
  "Area Sales Manager (B2B)",
  "Hardware and Networks - Other",
  "Treasury Manager",
  "Finance Manager",
  "Pre Sales Consultant",
  "Banking Operations - Other",
  "Sales Manager",
  "Strategic Management - Other",
  "Branch Operations Manager",
  "Service Delivery Leader",
  "Assistant Professor / Lecturer",
  "Events & Promotions",
  "Direct Marketing",
  "Robotic Test Engineer",
  "Corporate Training - Other",
  "Staffing Management",
  "Investment Banking Analyst",
  "Industrial Engineer",
  "Manager Taxation",
  "Accounts Manager",
  "Cost Accountant",
  "Other",
  "Procurement / Purchase Manager",
  "Business Development Manager (BDM)",
  "Transportation Engineer",
  "Equity Research Analyst",
  "Clinical research Scientist",
  "Operations Manager",
  "Production & Manufacturing - Other",
  "Transition Manager",
  "Logistics Executive",
  "Field Sales Executive",
  "CTO",
  "Quality Auditor / Inspector",
  "Service Engineer",
  "UX; Design & Architecture - Other",
  "Operations Consultant",
  "Service / Maintenance Supervisor",
  "Production Manager / Supervisor",
  "Back Office Executive",
  "Design Team Lead",
  "Solution Architect",
  "IT Operations Management",
  "Finance Executive",
  "Channel Management",
  "Key Account Manager",
  "Other Consulting - Other",
  "Asset Operations",
  "QA / QC Manager",
  "Healthcare & Life Sciences - Other",
  "Electrical Engineer",
  "Purchase Executive / Officer",
  "MD / CEO",
  "Merchant Acquisition - BD / Pre Sales",
  "Architect",
  "Procurement & Supply Chain - Other",
  "Data Entry / MIS",
  "Audit & Control - Other",
  "Mutual Fund Operations",
  "Molecular Biologist",
  "Audit Manager",
  "Forex Manager",
  "Corporate Planning",
  "Construction / Site Supervisor",
  "Mechanical Engineer",
  "Head - Marketing",
  "Embedded Systems Engineer",
  "Product Manager - Insurance",
  "Subject / Specialization Teacher - Other",
  "Head - Operations",
  "Associate / Consultant",
  "Regulatory Affairs Compliance",
  "Switching / Router Engineering",
  "Portfolio Manager",
  "Manufacturing Engineering Manager",
  "Insurance Analyst",
  "Content Creation / Writer",
  "Credit Manager",
  "Credit Analyst",
  "Branch Manager",
  "Project Finance Manager",
  "Head - Administration",
  "Legal Liaisoning",
  "Insurance Operations Manager",
  "Sr. Consultant",
  "Design & Development Manager",
  "Chartered Accountant (CA)",
  "Analytics / BI Manager",
  "Product Marketing",
  "Relationship Manager",
  "Advertising Management",
  "Brand Management",
  "Telesales",
  "Civil Engineer",
  "Marketing - Other",
  "Front Office",
  "Business Head",
  "Logistics Manager",
  "Chemical Research Scientist",
  "Quality Manager / Supervisor",
  "Market Research Manager",
  "Top Management - Other",
  "Head - Tech Support",
  "Warehouse Executive",
  "Hedge Fund Manager",
  "Channel Partner / Client Relations",
  "Executive Assistant",
  "Regional Sales Manager (B2B)",
  "Personal Banker",
  "Back Office",
  "Head - BD / Pre Sales",
  "Media Buying",
  "Head - Analytics / BI",
  "Hardware Architect",
  "Branch Sales Executive",
  "Insurance Sales / BD Manager",
  "Financial Consultant",
  "SEO",
  "Branch Sales Manager (B2B)",
  "Card Operations Executive / Lead",
  "Geotechnical Engineer",
  "Customer Service",
  "Country Head",
  "Investment Banking; Private Equity & VC - Other",
  "Performance Management",
  "Branch Sales Manager (B2C)",
  "Marketing and Communication - Other",
  "Chief Financial Officer (CFO)",
  "Draughtsman",
  "Merchandiser",
  "Quality Specialist",
  "Client Retention",
  "Regional Sales Manager (B2C)",
  "Research Scientist",
  "Administration - Other",
  "Insurance Agent / Advisor",
  "Product Manager - Loans",
  "Medical Representative (MR)",
  "Customer Engagement",
  "Social Media Marketing",
  "Editor / Content Analyst",
  "Travel Desk Coordination",
  "Enterprise & B2B Sales - Other",
  "Front Office Manager",
  "Other Hospital Staff - Other",
  "Email Marketing",
  "Content; Editorial & Journalism - Other",
  "Collection Executive / Officer",
  "Project Architect",
  "Professor",
  "Restaurant Manager",
  "Head - Client Relations",
  "Sales Operations / Enablement",
  "Communication Trainer",
  "Head - R & D",
  "Trading; Asset & Wealth Management - Other",
  "General Insurance - Other",
  "Production / Manufacturing Head",
  "Medical Writer",
  "Plant / Factory Head",
  "Head - Digital Marketing",
  "Bidding / Auction / Proposal",
  "Communication Skills Teacher",
  "Media Production & Entertainment - Other",
  "CFO",
  "Fleet / Transport Manager",
  "Chief Accounting Officer (CAO)",
  "Hotel / General Manager",
  "Derivatives Trader",
  "Security Engineer / Analyst",
  "Head - Recruitment",
  "Legal Officer",
  "Sales Officer",
  "Aircraft Maintenance Engineer",
  "Equity Dealer",
  "Facility Manager",
  "Head - Training & Development",
  "Computers Teacher",
  "Legal & Regulatory - Other",
  "Pharmacist",
  "Bancassurance Manager",
  "Retail Store Manager",
  "Copywriter",
  "Export / Import Manager",
  "Treasury & Forex - Other",
  "Engineering & Manufacturing - Other",
  "Head - Quality",
  "Executive Chef",
  "Lab Technician",
  "Account / Relationship Management - Voice / Blended",
  "Copy Editor",
  "Sales Head (B2B)",
  "Music Arranger",
  "Lead Generation / Qualification",
  "Campaign Manager",
  "EHS Officer",
  "Head - F&B",
  "Bio Technologist",
  "Fashion Designer",
  "Change Manager",
  "Head - Corporate Communication",
  "Head - Logistics / SCM",
  "Head - Regulatory Affairs",
  "Sous Chef",
  "Phone Banking Officer",
  "Textile Designer",
  "Food; Beverage & Hospitality - Other",
  "Back End Developer",
  "Travel Agent / Consultant",
  "Post Doctoral Researcher",
  "Reporting / Corresponding",
  "Head - Media Relations",
  "CIO",
  "Lab Assistant",
  "Statistician",
  "Administration & Staff - Other",
  "Investor Relations Officer",
  "Subject Matter Expert - IT",
  "UI / UX Designer",
  "Mathematics Teacher",
  "Principal",
  "Practice Manager / Head",
  "Forex Officer",
  "Interaction Designer",
  "Head - Facilities",
  "Transport Management",
  "Chief Information Security Officer (CISO)",
  "Art Direction (Advertisement)",
  "Company Secretary / Compliance Officer",
  "Reservation Executive",
  "Voice & Accent Trainer",
  "Ground Staff",
  "Investment Advisor",
  "Flight Engineer",
  "Otolaryngologist (ENT)",
  "Biology Teacher",
  "Collection / Recovery Manager",
  "SEM / PPC Specialist",
  "CSR Manager",
  "Department / Floor Manager",
  "Interior Designer",
  "Aviation & Aerospace - Other",
  "ERP Architect",
  "Dean / Director",
  "Animator",
  "Chief Creative Officer (CCO)",
  "Quality Assurance and Testing - Other",
  "Product Designer",
  "Head - Hardware Engineering",
  "Special Education Teacher",
  "Underwriter",
  "Advisor / Consultant",
  "Microbiologist",
  "Tour Guide / Coordinator",
  "Reservation Manager",
  "Primary School Teacher",
  "Structural Engineer",
  "Product Manager - Cards",
  "Sports; Fitness & Personal Care - Other",
  "RF Design / Layout Engineer",
  "Cinematographer",
  "English Teacher",
  "MEP Engineer",
  "Banquet Manager",
  "CSR & Sustainability - Other",
  "Wealth Manager",
  "Housekeeping Executive / Attendant",
  "Creative Marketing",
  "Cashier",
  "Chemistry Teacher",
  "Asset Manager",
  "Chief Officer / Mate",
  "Co-Pilot / First Officer / Second Officer",
  "Performance Testing Engineer",
  "Insurance Operations Executive",
  "Operations; Maintenance & Support - Other",
  "Medical Officer",
  "Chef De Partie / Demi Chef De Partie",
  "Lending - Other",
  "Yoga Instructor / Trainer",
  "Security Officer - Other",
  "Affiliate Marketing",
  "Quality Head",
  "Head - Creative",
  "Counselor",
  "Curriculum Designer",
  "Accessory Designer",
  "Physics Teacher",
  "Commerce Teacher",
  "Shipping Deck - Other",
  "Automation Test Engineer",
  "Commodity Manager",
  "Academic Coordinator",
  "Fund Manager",
  "Unarmed Security Guard",
  "Landscape Architect",
  "Librarian",
  "Chief Legal Officer (CLO)",
  "Finance Project Head",
  "Flight & Airport Operations - Other",
  "Guest Service Associate",
  "Principal / Partner / Director",
  "Retail Cashier",
  "Fitness Trainer / Gym Instructor",
  "Claims Manager",
  "Tour Manager",
  "Geographic Information System / GIS",
  "Housekeeping Manager / Supervisor",
  "Forex Dealer",
  "Managing Editor",
  "Aviation Security Officer",
  "Stock Broker",
  "Revenue Manager",
  "Ophthalmological Surgeon",
  "Video Editor",
  "Editing - Other",
  "Aviation Engineer",
  "Marketing Consultant",
  "Chief Medical Officer",
  "Front Office & Guest Services - Other",
  "Security Supervisor",
  "Head - Taxation",
  "Visual Merchandiser",
  "Assistant Director",
  "Security Head",
  "Dialer Manager",
  "Captain / Master Mariner",
  "Head - Tour Management",
  "Host / Hostess",
  "Chief Risk Officer (CRO)",
  "Front End Developer",
  "Quality Consultant",
  "Data Engineer",
  "Technical Operations (Tech Ops)",
  "BFSI; Investments & Trading - Other",
  "IT & Information Security - Other",
  "DBA / Data warehousing - Other",
  "Mobile / App Developer",
  "BI Developer",
  "Configuration and Deployment Management",
  "DevOps Engineer",
  "ETL Developer",
  "Quality Assurance - Other",
  "IT Support - Other",
  "Manual Test Engineer",
  "Big Data Engineer",
  "Security Testing Engineer",
  "Service Delivery Associate",
  "Team Leader",
  "Automation Developer",
  "CRM Architect",
  "Cloud System Administration",
  "Software Developer in Test (SDET) (IC Role)",
  "Project Coordinator",
  "Database Analyst",
  "ERP Developer",
  "Application Security Engineer",
  "IT Recruiter",
  "IT Infrastructure Services - Other",
  "Program Manager",
  "Machine Learning Engineer",
  "Business Intelligence & Analytics - Other",
  "General Surgeon",
  "Private Equity Analyst",
  "Product Analyst",
  "AR VR QA Tester",
  "Analyst - Financial Planning & Analysis",
  "IT Security - Other",
  "Data Science & Machine Learning - Other",
  "Implementation Manager",
  "Retail Sales",
  "Automation Architect",
  "Recruitment & Talent Acquisition - Other",
  "UI / UX - Other",
  "Project Manager",
  "Data Scientist",
  "General Physician",
  "Technology / IT - Other",
  "Telecom - Other",
  "Finance - Other",
  "Manager - Data Science",
  "Security Services - Other",
  "Non Voice - Other",
  "Search Engineer",
  "Teaching & Training - Other",
  "IT Network - Other",
  "BI Architect",
  "Site Reliability Engineer",
  "Service Delivery Manager",
  "Problem Management",
  "Customer Success Manager",
  "Operations - Other",
  "Database Developer / Engineer",
  "Center Head",
  "Cyber Security",
  "Product Manager - Other",
  "Head - DevOps",
  "DevOps - Other",
  "Quality Analyst",
  "Subject Matter Expert",
  "Customer Success; Service & Operations - Other",
  "Voice / Blended - Other",
  "Quality Engineer",
  "Machine Operator / Machinist",
  "Assembly Engineer",
  "Manufacturing Engineer",
  "Incident Management",
  "Test Architect (IC role)",
  "Process / Operational Excellence",
  "Sales Support & Operations - Other",
  "Software Compliance - License Management",
  "Power Plant Technician",
  "IT Asset Management",
  "Engineering Services Supervisor",
  "Security Administrator",
  "Cloud Consultant",
  "Pharmaceutical & Biotechnology - Other",
  "DevOps Consultant / Architect",
  "Payroll & Transactions - Other",
  "Service Delivery - Other",
  "Accounting & Taxation - Other",
  "MIS Executive",
  "Treasury Executive",
  "Team Lead / Network Manager",
  "Taxation Executive",
  "Financial Controller",
  "Tax Analyst",
  "Risk Management & Compliance - Other",
  "Infrastructure Architect",
  "Billing Executive",
  "Data Centre Ops and Server Management",
  "Accounts Payable Executive",
  "Accounts Receivable Executive",
  "Head - Network Operations",
  "Treasury Analyst",
  "Back Office Operations",
  "Accounts Payable Manager",
  "Audit Executive",
  "Manager - Financial Planning & Analysis",
  "Operations Engineer",
  "Internal Auditor",
  "Assistant Manager",
  "Head - Program / Project",
  "Investment Banking Associate",
  "Head - Finance & Accounts",
  "Accounts Receivable Manager",
  "Fraud Detection / Prevention",
  "Management Consulting - Other",
  "Director - Program Management",
  "IT Audit",
  "After Sales Service & Repair - Other",
  "ATM Operations Manager",
  "Investment / Lending Risk",
  "Diversity & Inclusion",
  "Other Program / Project Management - Other",
  "Account / Relationship Management - Non Voice",
  "Chief Accountant",
  "Game Developer / Programmer",
  "eCommerce Executive",
  "Visiting Faculty / Guest Faculty",
  "Content Management (Print / Online / Electronic) - Other",
  "Content Publisher",
  "Content Designer",
  "Content Marketing Manager",
  "Content Designer / Strategist",
  "Digital Marketing - Other",
  "Security Architect / Consultant",
  "Aerospace Engineer",
  "Document Controller",
  "Merchandising; Retail & eCommerce - Other",
  "Data warehouse Architect / Consultant",
  "Assembly Line Operator",
  "Customer Success Associate",
  "SCM & Logistics - Other",
  "Analytics Consultant",
  "Application Engineer",
  "Business Process Quality - Other",
  "Game Tester",
  "Corporate Development Manager",
  "Environment Health and Safety - Other",
  "HR Analyst",
  "Catalog Executive",
  "NLP / DL Engineering / Architect",
  "Network Security Engineer",
  "Data warehouse Manager",
  "Direct Sales Executive",
  "Data Platform Engineer",
  "Network Manager",
  "Credit Risk",
  "Head - QA",
  "Product Development Engineer",
  "Full Stack Data Scientist",
  "Release Engineer",
  "DevOps Manager",
  "BI Administration",
  "Data warehouse Developer",
  "Back Office - Other",
  "Non Tech Support - Non Voice",
  "Non Tech Support - Voice / Blended",
  "Software Developer in Test (SDET)",
  "Design Engineer",
  "Product Engineer",
  "Clinical Informatics",
  "Supply Chain Manager",
  "Assessment / Advisory - Other",
  "Head - Data Science",
  "Associate Professor",
  "QA / QC Analyst",
  "Design Manager",
  "Head - Engineering",
  "Product Operations Associate / Lead",
  "Head - Program Management",
  "Test Architect",
  "HR Operations - Other",
  "Network Service Technician",
  "Network Programmer / Analyst",
  "Strategy Manager",
  "Project Engineer",
  "Field Service Engineer",
  "Network Architect",
  "Editing (Print / Online / Electronic) - Other",
  "Billing / Records",
  "Market Risk",
  "Advertising & Creative - Other",
  "Quantity Surveying",
  "IT Vendor Management",
  "Logistics / SCM Analyst",
  "Computer Vision",
  "Electrician",
  "Retail Sales Associate",
  "Embedded Hardware Engineer",
  "Social Worker",
  "Technology Product Management - Other",
  "Blockchain Quality Assurance Engineer",
  "Hardware Reliability Engineer",
  "Principal Program Manager",
  "Technical Product Manager",
  "PMO Executive",
  "Marketing Automation Specialist",
  "Engineering - Other",
  "Production Engineer",
  "White Box Testing Engineer",
  "eCommerce Operations - Other",
  "Risk Consultant",
  "Pre Sales Engineer",
  "Strategic & Top Management - Other",
  "Procurement Analyst",
  "Mechatronics Engineer",
  "Employer / Employee Branding",
  "UX Design Manager",
  "Due Diligence",
  "Hardware - Other",
  "Email Support",
  "Merchandising & Planning - Other",
  "Area Sales Manager (B2C)",
  "Area / Territory Manager",
  "Product Head",
  "Database Manager",
  "Project Planner / Scheduler",
  "Bilingual / Multilingual Support - Voice / Blended",
  "Acquisition Manager",
  "Collections",
  "Risk Analyst",
  "Construction / Manufacturing - Other",
  "Business Development Executive (BDE)",
  "Principal Consultant",
  "Finance Project Manager",
  "Manager - R & D",
  "3D Visualizer / Artist",
  "Analyst Relations",
  "Customer Onboarding - Voice / Blended",
  "Customer Retention - Voice / Blended",
];

const jobRoleOptions: SelectProps["options"] = [];
jobRole.forEach((job) => {
  jobRoleOptions.push({
    label: job,
    value: job,
  });
});

const locationList = [
  "Mumbai",
  "Chennai",
  "Hyderabad",
  "Bengaluru / Bangalore",
  "Mangalore",
  "Coimbatore",
  "Pune",
  "Gwalior",
  "Mysore",
  "Jaipur",
  "Kolkata",
  "Noida",
  "Greater Noida",
  "kohima",
  "Other City",
  "Trivandrum",
  "Kozhikode",
  "Silchar",
  "Chandigarh",
  "Vadodara",
  "Bhopal",
  "Nagpur",
  "Bangalore",
  "Gurgaon",
  "Delhi",
  "Indore",
  "Aurangabad",
  "Bareilly",
  "Kochi",
  "Warangal",
  "Singapore(SINGAPORE)",
  "Ahmedabad",
  "Cochin",
  "Saudi Arabia(Riyadh)",
  "Haldwani",
  "Navi Mumbai",
  "hyderabad",
  "Bhubaneshwar",
  "Kanpur",
  "Patna",
  "Malaysia(Petaling Jaya)",
  "Oman(Muscat)",
  "Ghaziabad",
  "Kottayam",
  "Mohali",
  "United States (US)(Jersey City)",
  "secundrabad",
  "United States (US)(Perth Amboy; NJ)",
  "United Kingdom (UK)(Swindon)",
  "United States (US)(Tucson)",
  "Saudi Arabia(JEDDAH)",
  "Raipur",
  "Visakhapatnam",
  "Mumbai Suburbs",
  "Amravati",
  "Other International Location(Muscat; Oman)",
  "Pondicherry",
];

const locationOptions: SelectProps["options"] = [];
locationList.forEach((location) => {
  locationOptions.push({
    label: location,
    value: location,
  });
});

const skillsList = [
  "Seeking senior level assignments in Operations ",
  " Process Management ",
  " Business Analysis ",
  " Training & Development with an organization of repute",
  "MOBILE APPLICATION TESTING(IOS AND ANDROID)",
  "WEB APPLICATION TESTING",
  "PRODUCT TESTING",
  " TEST PLANNING",
  " TEST REPORTING",
  "MANUAL ",
  "BUGZILLA 3.6.3",
  "TRELLO AND SELINIUM",
  "Senior Business Process Specialist",
  "Business Analyst",
  "Credit Card Domain",
  "Data Analysis",
  "Business Analysis",
  "Business Processes Management",
  "Collections Recovery Management",
  "Customer Correction Analysis",
  "SQL",
  "SAS",
  "Business Objects",
  "Cognos",
  "Pentaho",
  "Qlikview",
  "QA Testing",
  "Fusion Middleware dba ",
  " Weblogic ",
  " Netezza dba  ",
  " MySQL dba  ",
  " Oracle DBA ",
  " MS SQL Server dba",
  "Sharepoint Development 2010",
  " 2013",
  "VB.NET",
  " C#.NET",
  " Web Services",
  " SQL Server",
  "Core Java ",
  "Service virtualization",
  " Selenium",
  " Automation Testing",
  "ASP.NET 4.0",
  "ASP.Net 3.5",
  " ASP.NET 2.0",
  " C#",
  " VB.NET",
  " XML",
  " ADO.NET",
  " SQL Server 2005",
  " 2008",
  " Linq to SQL",
  " SSIS",
  "Oracle DBA",
  " RMAN",
  " Oracle Golden Gate",
  " Oracle 11g RAC",
  " Data guard",
  " ASM",
  " shell scripting",
  " Ptuning",
  "Node js",
  "Angular",
  "Python",
  "Java",
  "Javascript",
  "jQuery",
  "bootstrap",
  "Manual Testing",
  " regression testing",
  " retesting",
  " sanity testing",
  " GUI testing",
  " Bugzilla",
  " JIRA",
  " QC",
  "Core JAVA",
  " ADVANCE JAVA",
  "ORACLE 11g",
  "AWS",
  "react",
  "java",
  "node",
];

const skillsOptions: SelectProps["options"] = [];
skillsList.forEach((skill) => {
  skillsOptions.push({
    label: skill,
    value: skill,
  });
});
//const [active, setActive] = useState(true);
const Sidenav = ({ handleSubmit }: props) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [form] = Form.useForm();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const formRef = React.createRef<FormInstance>();

  const onReset = () => {
    formRef.current!.resetFields();
    setIsShown(false);
  };
  const onFinish = (value: FormValue) => {
    handleSubmit(value);

    setIsShown(current => !current);
    // if(){
    // let conter = document.getElementById()

    let myContainer = document.getElementById('colorChanged') as HTMLInputElement;
    // myContainer.innerHTML = "Green(<=1month)";
    myContainer.innerHTML = "";

    let myContainer1 = document.getElementById('colorChanged1') as HTMLInputElement;
    // myContainer1.innerHTML = "Yellow(Between 2-5 months)";
    myContainer1.innerHTML = "";

    let myContainer2 = document.getElementById('colorChanged2') as HTMLInputElement;
    // myContainer2.innerHTML = "Orange(>=6months)";
    myContainer2.innerHTML = "";
    // }
    // formRef.current!.resetFields();
  };

  const onValuesChange = async (values: any) => {
    setIsButtonDisabled(!form.isFieldsTouched(true));
  };
  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    setIsButtonDisabled(true);
  };

  //   const colorDisplay=()=> {
  //     // document.getElementById("binaryPrint").innerHTML = "test!";
  //     document.getElementById('colorChanged')!.click();
  //    //  document.getElementById("colorChanged").click = handleSubmit()
  // }

  const [isShown, setIsShown] = useState(false);
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  const cardColor: SliderMarks = {
    0: {
        style: {
          color: 'grey',
        },
        label: <p>0 Month</p>,
      },
    27: {
      style: {
        color: 'grey',
      },
      label: <p>1 Month</p>,
    },
    57: {
      style: {
        color: 'grey',
      },
      label: <p>6 Months</p>,
    },
  };

  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 60,
        bottom: 0,
        background: colorBgContainer,
      }}
      width={"32%"}
    >
      <Form
      style={{overflow:"auto",height:"500px"}}
        form={form}
        initialValues={{ remember: true }}
        ref={formRef}
        layout={"vertical"}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
      >
        <p style={{ marginTop: "20px", marginLeft: "10px" }}>
          <UserOutlined className="site-form-item-icon" />
          <span style={{ marginLeft: "5px" }}>Job Role</span>
        </p>
        <Form.Item name="jobRole" rules={[{ required: true }]}>
          <Select
            
            allowClear
            style={{ width: "85%", marginLeft: "35px", marginRight: "10px" }}
            placeholder="Please select"
            options={jobRoleOptions}
          />
        </Form.Item>

        <p style={{ marginTop: "20px", marginLeft: "10px" }}>
          <PictureOutlined className="site-form-item-icon" />
          <span style={{ marginLeft: "5px" }}>Location</span>
        </p>
        <Form.Item name="location" rules={[{ required: true }]}>
          <Select
             mode="tags"
            //showSearch
            allowClear
            style={{ width: "85%", marginLeft: "35px", marginRight: "10px" }}
            placeholder="Please select"
             options={locationOptions}
          />
        </Form.Item>

        <p style={{ marginTop: "20px", marginLeft: "10px" }}>
          <FireOutlined className="site-form-item-icon" />
          <span style={{ marginLeft: "5px" }}>Skills</span>
        </p>

        <Form.Item name="skills" rules={[{ required: true }]}>
          <Select
            mode="tags"
            allowClear
            style={{ width: "85%", marginLeft: "35px", marginRight: "10px" }}
            placeholder="Please select"
            options={skillsOptions}
          />
        </Form.Item>

        <p style={{ marginTop: "20px", marginLeft: "10px" }}>
          <LineChartOutlined className="site-form-item-icon" />
          <span style={{ marginLeft: "5px" }}>Experience</span>
        </p>
        <Form.Item name="experience" rules={[{ required: true }]}>
          <Slider
            range
            min={1}
            max={20}
            style={{ width: "335px", marginLeft: "38px" }}
          />
        </Form.Item>
        <p style={{ marginTop: "20px", marginLeft: "10px" }}>
          <FileSearchOutlined className="site-form-item-icon" />
          <span style={{ marginLeft: "5px" }}>Internal Data</span>
        </p>
        <Form name="bench">
        <Switch onChange={onChange} style={{marginLeft:"35px"}}/>
        </Form>
        <Form.Item style={{ float: "right", marginRight: "15px" }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "10px" }}
            disabled={isButtonDisabled}
          >
            Submit
          </Button>

          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>

          {/* Card Color  show onClick Submit */}
       
          {isShown &&
          <div style={{marginLeft:"-190px",marginTop:"15px"}}>
          <span>Resume Last Updated</span>
    <Slider   disabled className="clr" marks={cardColor}/></div>}<br/>

    {/* <div style={{ marginTop: "50px", marginLeft: "-50px" }}>
            {isShown &&
              <Tooltip placement="topRight" title="Less than 1 month data" color="#d9ead3" key="#d9ead3">
                <Box id="colorChanged" style={{ width: "15px", height: "15px", background: "#d9ead3", display: "inline-block" }} /></Tooltip>
            }&nbsp;&nbsp;
            {isShown &&
              <Tooltip title="Between 1-6 months data" color="#fff2cc" key="#fff2cc">
                <Box id="colorChanged1" style={{ width: "15px", height: "15px", background: "#fff2cc", display: "inline-block" }} /></Tooltip>}&nbsp;&nbsp;
            {isShown &&
              <Tooltip placement="topLeft" title="More than 6 months data" color="#f9cb9c" key="#f9cb9c">
                <Box id="colorChanged1" style={{ width: "15px", height: "15px", background: "#f9cb9c", display: "inline-block" }} /></Tooltip>
            }
          </div> */}
        </Form.Item>
      </Form>
    </Sider>
  );
};
export default Sidenav;