import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Card, Typography } from "antd";
import {
  PublicClientApplication,
  AuthenticationResult,
} from "@azure/msal-browser";

const { Title, Text } = Typography;

const msalConfig = {
  auth: {
    clientId: "34c2bfbb-a701-4594-a453-bf0893d30b67",
    authority:
      "https://login.microsoftonline.com/9e19c113-9fbf-4030-b93e-10fc81bd1965",
    redirectUri: window.location.origin,
  },
};
const msalInstance = new PublicClientApplication(msalConfig);
const LoginPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const handleLogin = async () => {
    try {
      if (!msalInstance.getActiveAccount()) {
        await msalInstance.initialize();
      }
      const loginResponse: AuthenticationResult = await msalInstance.loginPopup(
        {
          scopes: ["openid", "profile", "email", "User.Read"],
        }
      );

      const accessToken = loginResponse.accessToken;
      if (!accessToken) throw new Error("Access token not found.");
      const response = await fetch("https://graph.microsoft.com/v1.0/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const userData = await response.json();
      console.log("User Info:", userData);

      if (userData.mail && userData.mail.endsWith("@accionlabs.com")) {
        setUserInfo(userData);
        Cookies.set("atsUser", JSON.stringify(userData), { expires: 0.5 });
      } else {
        setError("Please sign in with an @accionlabs.com account.");
      }
    } catch (err) {
      setError("An error occurred while signing in.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: 400, textAlign: "center", padding: 20 }}>
        <Title level={4}>Sign in with Microsoft</Title>
        <Text type="secondary">
          Choose an account to continue to PMO Intranet
        </Text>

        <Button
          type="primary"
          style={{ width: "100%", marginTop: 20 }}
          onClick={handleLogin}
        >
          Sign in with Microsoft
        </Button>

        {error && (
          <Text type="danger" style={{ display: "block", marginTop: 10 }}>
            {error}
          </Text>
        )}
      </Card>
    </div>
  );
};

export default LoginPage;
