import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookie from "js-cookie";
import "./style.css";
import * as Constants from "../../Constants";

const LoginPage = () => {
  const [enterJwttoken, setJwttoken] = useState<object>({});

  const navigate = useNavigate();

  useEffect(() => {
    if (Object.entries(enterJwttoken).length) {
      return navigate("/");
    }
  }, [enterJwttoken]);

  const [loginData,setLoginData]=useState({});
  useEffect(() => {
    window.scrollTo(0, 0)
    fetch(Constants.getEmailLoginValidateUrl, {
       headers: { 
       }
    })
       .then(res => res.json())
       .then(result => {
          setLoginData(result)
       })
 }, [])

  return (
    <div className="login-google-container">
      <div className="google-container">
   
        <GoogleOAuthProvider  clientId="136393195060-5ba2grphv6ejklpraeodettqcvv2k8ji.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={(credentialResponse: any) => {
              let jwtt: any[] = jwt_decode(credentialResponse.credential);
              let jwt_token: string = credentialResponse.credential;
              setJwttoken(jwtt);
              Cookie.set("atsUser", jwt_token, {
                expires: 15,
                secure: true,
                sameSite: "strict",
                path: "/",
              });
            }}
            onError={() => {
              alert("Login Failed");
            }}
            useOneTap
          />
        </GoogleOAuthProvider>
        {/* {
          loginData ? (
            <div>
              <h3>loginData.dl_email</h3>
            </div>
          ): (
            <GoogleLogin
            onSuccess={(credentialResponse: any) => {
              let jwtt: any[] = jwt_decode(credentialResponse.credential);
              let jwt_token: string = credentialResponse.credential;
              setJwttoken(jwtt);
              Cookie.set("atsUser", jwt_token, {
                expires: 15,
                secure: true,
                sameSite: "strict",
                path: "/",
              });
            }}
            onError={() => {
              alert("Login Failed");
            }}
            useOneTap
          />
          )} */}
      </div>
    </div>
  );
};

export default LoginPage;