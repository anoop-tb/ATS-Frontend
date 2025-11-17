import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const navigate = useNavigate();

useEffect(() => {
  // Simulate a login process
    navigate("/");
  }, [navigate]);
  return null;
};

 

export default LoginPage;
