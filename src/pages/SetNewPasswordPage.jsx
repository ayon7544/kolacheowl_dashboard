import React, { useState } from "react";
import { toast } from "react-toastify";
import Text from "../components/Text";
import Inputbox from "../components/InputBox";
import Button from "../components/Button";

const SetNewPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      toast.success("Password updated successfully!");

    } else {
      toast.error("Passwords do not match. Please try again.");

    }
  };

  return (
 <div className="flex items-center justify-center min-h-screen bg-slate-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-150">
        <Text text="Set a new password" />

        <p className="text-center text-gray-600 mb-4">
          Create a new password. Ensure it differs from previous ones for
          security
        </p>

        <form onSubmit={handleSubmit}>
          <Inputbox
            label="New Password"
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

          <Inputbox
            label="Confirm New Password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            showPassword={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
          />

          <Button buttonText="Update Password" handleSubmit={handleSubmit} />
        </form>
      </div>
    </div>
  );
};

export default SetNewPasswordPage;
