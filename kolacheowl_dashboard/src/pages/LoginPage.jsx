import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Text from "../components/Text";
import Inputbox from "../components/InputBox";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate(); // Move useNavigate here

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in both email and password");
      return;
    }
    console.log({ email, password, remember });
    toast.success("Successfully logged in!");
    navigate("/dashboard"); // Use navigate here
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-150">
        <Text text="Log in to your account" />

        <p className="text-center text-gray-600 mb-4">
          Please enter your email and password to continue
        </p>

        <form onSubmit={handleSubmit}>
          <Inputbox
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Inputbox
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="mr-2"
              />
              <label htmlFor="remember" className="text-gray-700">
                Remember Password
              </label>
            </div>
            <Link
              to="/forgetPassword"
              className="text-sm text-red-700 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button buttonText="Sign In" handleSubmit={handleSubmit} />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
