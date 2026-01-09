import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Text from "../components/Text";
import Inputbox from "../components/InputBox";
import Button from "../components/Button";
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address."); // 
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address."); 
      return;
    }

    toast.success("Verification code sent to your email!");

    
    setTimeout(() => {
      navigate("/verifyCode");
    }, 1500); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-150">
        <Text text={"Forgot Password ?"} />

        <form onSubmit={handleSubmit}>
          <Inputbox Inputbox={email} setInputBox={setEmail} label={"Email"} />
          <Button handleSubmit={handleSubmit} buttonText={"Send Code"} />
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
