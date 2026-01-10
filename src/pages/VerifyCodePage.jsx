import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Text from "../components/Text";
import Button from "../components/Button";

const VerifyCodePage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleInputChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value !== "" && index < 4) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (code.includes("") || code.length !== 5) {
      toast.error("Please enter all 5 digits");
      return;
    }

    console.log("Verification Code Submitted:", code.join(""));
    toast.success("Verification code submitted successfully!");

    navigate("/setNewPassword");
  };

  const handleResend = () => {
    toast.info("Verification code resent!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-150">
        <Text text="Verification code" />

        <p className="text-center text-gray-600 mb-4">
          We sent a reset link to contact@dscode...com
          <br />
          Enter the 5-digit code that is mentioned in the email
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex justify-center mb-4 space-x-2"
        >
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              onChange={(e) => handleInputChange(e.target.value, index)}
              maxLength="1"
              className="w-14 h-14 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </form>

        <Button buttonText="Verify Code" handleSubmit={handleSubmit} />

        <p className="text-center mt-4">
          You have not received the email?{" "}
          <a
            href="#"
            onClick={handleResend}
            className="text-sm text-green-500 hover:underline"
          >
            Resend
          </a>
        </p>
      </div>
    </div>
  );
};

export default VerifyCodePage;
