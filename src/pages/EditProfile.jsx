import React, { useState } from "react";
import {
  Camera,
  Eye,
  EyeOff,
  CheckCircle2,
  User,
  Mail,
  Globe,
} from "lucide-react";
import { FileUploader } from "../components/FileUploader"; // Import here
export default function ProfileManagement() {
  const [activeTab, setActiveTab] = useState("change-password"); // Controls which view is shown
  const [showSuccess, setShowSuccess] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Maria",
    email: "admin@nessa.com",
    role: "Admin",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
  });
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleAvatarSelect = (file) => {
    const url = URL.createObjectURL(file);
    setProfileData({ ...profileData, avatar: url });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6 md:pt-20 font-sans text-slate-800">
      {/* Profile Header Card */}
      <div className="w-full max-w-200 bg-[#333333] rounded-[2.5rem] p-8 mb-10 relative flex flex-col items-center shadow-xl">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-slate-200">
            <img
              src={profileData.avatar}
              className="w-full h-full object-cover"
              alt="Profile"
            />
          </div>
          {/* Reusable Uploader wrapping the camera button */}
          <FileUploader onFileSelect={handleAvatarSelect} accept="image/*">
            <div className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100 transition-colors cursor-pointer">
              <Camera size={16} className="text-slate-700" />
            </div>
          </FileUploader>
        </div>
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold text-white">{profileData.name}</h2>
          <p className="text-gray-400 text-sm">{profileData.role}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-10 mb-8 border-b border-gray-100 w-full max-w-125 justify-center">
        <button
          onClick={() => setActiveTab("edit-profile")}
          className={`pb-2 text-sm font-bold transition-all ${
            activeTab === "edit-profile"
              ? "text-slate-800 border-b-2 border-slate-800"
              : "text-gray-400"
          }`}
        >
          Edit Profile
        </button>
        <button
          onClick={() => setActiveTab("change-password")}
          className={`pb-2 text-sm font-bold transition-all ${
            activeTab === "change-password"
              ? "text-slate-800 border-b-2 border-slate-800"
              : "text-gray-400"
          }`}
        >
          Change Password
        </button>
      </div>

      {/* SUCCESS MESSAGE */}
      {showSuccess && (
        <div className="w-full max-w-125 mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl flex items-center gap-3 text-sm font-medium animate-in zoom-in duration-300">
          <CheckCircle2 size={18} /> Settings updated successfully!
        </div>
      )}

      {/* --- CONDITIONAL RENDERING LOGIC --- */}
      <div className="w-full max-w-125 animate-in fade-in slide-in-from-bottom-2 duration-400">
        {activeTab === "edit-profile" ? (
          /* VIEW 1: EDIT PROFILE */
          <form onSubmit={handleSave} className="space-y-6">
            <h3 className="text-center text-lg font-bold text-slate-800 mb-8">
              Edit Profile Details
            </h3>
            <FormInput
              label="Full Name"
              icon={<User size={18} />}
              value={profileData.name}
              onChange={(e) =>
                setProfileData({ ...profileData, name: e.target.value })
              }
            />
            <FormInput
              label="Email Address"
              icon={<Mail size={18} />}
              value={profileData.email}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
            />
            <button
              type="submit"
              className="w-full py-4 bg-[#2D3139] text-white rounded-2xl font-bold shadow-lg hover:bg-slate-800 transition-all"
            >
              Update Profile
            </button>
          </form>
        ) : (
          /* VIEW 2: CHANGE PASSWORD */
          <form onSubmit={handleSave} className="space-y-6">
            <h3 className="text-center text-lg font-bold text-slate-800 mb-8">
              Change Password
            </h3>
            <PasswordInput
              label="Current Password"
              value={passwords.current}
              onChange={(e) =>
                setPasswords({ ...passwords, current: e.target.value })
              }
            />
            <PasswordInput
              label="New Password"
              value={passwords.new}
              onChange={(e) =>
                setPasswords({ ...passwords, new: e.target.value })
              }
            />
            <PasswordInput
              label="Confirm New Password"
              value={passwords.confirm}
              onChange={(e) =>
                setPasswords({ ...passwords, confirm: e.target.value })
              }
            />
            <button
              type="submit"
              className="w-full py-4 bg-[#2D3139] text-white rounded-2xl font-bold shadow-lg hover:bg-slate-800 transition-all"
            >
              Save & Change
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// --- REUSABLE INPUT COMPONENTS ---

function FormInput({ label, value, onChange, icon }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold text-slate-800 ml-1">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="w-full p-4 pl-12 bg-white border border-gray-300 rounded-xl focus:border-slate-400 outline-none text-sm"
        />
        <div className="absolute left-4 inset-y-0 flex items-center text-gray-400">
          {icon}
        </div>
      </div>
    </div>
  );
}

function PasswordInput({ label, value, onChange }) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold text-slate-800 ml-1">{label}</label>
      <div className="relative">
        <input
          type={isVisible ? "text" : "password"}
          value={value}
          onChange={onChange}
          className="w-full p-4 bg-white border border-gray-300 rounded-xl focus:border-slate-400 outline-none text-sm font-mono"
          placeholder="***********"
        />
        <button
          type="button"
          onClick={() => setIsVisible(!isVisible)}
          className="absolute right-4 inset-y-0 flex items-center text-gray-400"
        >
          {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}
