import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookie from "js-cookie";

const LoginPage = () => {
  const [enterJwttoken, setJwttoken] = useState<object>({});

  const navigate = useNavigate();
  useEffect(() => {
    console.log(enterJwttoken);
    console.log(!Object.entries(enterJwttoken).length);
    if (Object.entries(enterJwttoken).length) {
      return navigate("/");
    }
  }, [enterJwttoken]);

  return (
    <div>
      <GoogleOAuthProvider clientId="136393195060-5ba2grphv6ejklpraeodettqcvv2k8ji.apps.googleusercontent.com">
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
    </div>
  );
};

export default LoginPage;
