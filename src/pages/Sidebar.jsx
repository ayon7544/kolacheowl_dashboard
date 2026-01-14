import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaSignOutAlt, FaChevronRight } from "react-icons/fa";
import logo from "../assets/FF_city_Logo 1.svg";
import { LuLayoutDashboard } from "react-icons/lu";
import { HiOutlineBookOpen } from "react-icons/hi";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { CiCircleInfo } from "react-icons/ci";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { FaRegNewspaper } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useLogoutMutation } from "../services/allApi";
import { deleteCookie } from "../services/cookies";
import { toast } from "react-toastify";

const Sidebar = () => {
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [logout, { isLoading }] = useLogoutMutation();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleLogout = async () => {
    try {
      const res = await logout().unwrap();
      deleteCookie("NessasBrokenWorldAuthToken");
      localStorage.removeItem("user");
      toast.success(res?.message);
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  // Reusable Link Component to keep the Dashboard style consistent
  const SidebarItem = ({ to, icon: Icon, label }) => (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `w-full px-4 py-3 rounded-2xl flex items-center group transition-all duration-200 ${
            isActive ? "bg-white text-black" : "text-white hover:bg-neutral-800"
          }`
        }
      >
        {({ isActive }) => (
          <>
            <Icon
              className={`mr-3 size-5 transition-colors ${
                isActive ? "text-black" : "group-hover:text-white"
              }`}
            />
            <span
              className={`transition-colors font-medium ${
                isActive ? "text-black" : "text-white"
              }`}
            >
              {label}
            </span>
          </>
        )}
      </NavLink>
    </li>
  );

  return (
    <div
      className={`flex flex-col p-5 transition-all duration-300 min-h-screen bg-[#0C0E0F] text-white ${
        sidebarVisible ? "w-64" : "w-24"
      }`}
    >
      {/* HEADER SECTION - Toggle functionality exactly like your image */}
      <div className="flex items-center justify-between mb-8 w-full relative">
        {sidebarVisible && (
          <img src={logo} alt="Logo" className="h-10 w-auto transition-all" />
        )}

        <div
          className={`${
            sidebarVisible
              ? ""
              : "absolute inset-0 flex justify-center items-center m-3"
          }`}
        >
          <button
            onClick={toggleSidebar}
            className={`${
              sidebarVisible
                ? "h-full"
                : "h-14 w-10  flex items-center justify-center border-neutral-800 shadow-xl"
            } text-white focus:outline-none transition-all duration-300 hover:bg-neutral-900`}
          >
            <FaBars className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* FULL SIDEBAR CONTENT */}
      {sidebarVisible ? (
        <>
          <nav className="flex-1">
            <ul className="space-y-2">
              <SidebarItem
                to="/dashboard"
                icon={LuLayoutDashboard}
                label="Dashboard"
              />
              <SidebarItem to="/books" icon={HiOutlineBookOpen} label="Books" />
              <SidebarItem
                to="/characters"
                icon={LiaUserFriendsSolid}
                label="Characters"
              />
              <SidebarItem
                to="/blogs"
                icon={IoDocumentTextOutline}
                label="Blogs"
              />
              <SidebarItem
                to="/worldandthemes"
                icon={MdOutlineCategory}
                label="World & Themes"
              />

              {/* Settings Dropdown */}
              <li className="relative group/parent">
                <button className="w-full px-4 py-3 rounded-2xl flex items-center group transition-all text-white hover:bg-neutral-800">
                  <IoSettingsOutline className="mr-3 size-5 group-hover:text-white" />
                  <span className="font-medium group-hover:text-white">
                    Settings
                  </span>
                  <span className="ml-auto">
                    <FaChevronRight className="w-3 h-3 transition-transform duration-300 group-hover/parent:rotate-90" />
                  </span>
                </button>

                <ul className="pl-4 mt-2 space-y-2 hidden group-hover/parent:block border-l border-neutral-800 ml-4">
                  <SidebarItem
                    to="/editprofile"
                    icon={CgProfile}
                    label="Edit Profile"
                  />
                  <SidebarItem
                    to="/accountsettings"
                    icon={CiCircleInfo}
                    label="About Us"
                  />
                  <SidebarItem
                    to="/privacysettings"
                    icon={MdOutlinePrivacyTip}
                    label="Privacy Settings"
                  />
                  <SidebarItem
                    to="/termsandconditions"
                    icon={FaRegNewspaper}
                    label="Terms & Conditions"
                  />
                </ul>
              </li>
            </ul>
          </nav>

          <div className="mt-auto pt-4 border-t border-neutral-800">
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-2xl text-neutral-400 hover:text-white hover:bg-neutral-800 flex items-center transition-all disabled:opacity-50"
            >
              <FaSignOutAlt className="mr-3 size-5" />
              <span className="font-medium">
                {isLoading ? "Logging out..." : "Log out"}
              </span>
            </button>
          </div>
        </>
      ) : (
        /* ICON-ONLY NAVIGATION (When sidebar is collapsed) */
        <nav className="flex flex-col items-center space-y-8 mt-4 flex-1">
          <LuLayoutDashboard
            className="size-6 text-neutral-500 hover:text-white cursor-pointer"
            onClick={() => navigate("/dashboard")}
          />
          <HiOutlineBookOpen
            className="size-6 text-neutral-500 hover:text-white cursor-pointer"
            onClick={() => navigate("/books")}
          />
          <LiaUserFriendsSolid
            className="size-6 text-neutral-500 hover:text-white cursor-pointer"
            onClick={() => navigate("/characters")}
          />
          <IoSettingsOutline
            className="size-6 text-neutral-500 hover:text-white cursor-pointer"
            onClick={toggleSidebar}
          />

          <div className="mt-auto pb-4">
            <FaSignOutAlt
              className="size-6 text-neutral-500 hover:text-red-400 cursor-pointer"
              onClick={handleLogout}
            />
          </div>
        </nav>
      )}
    </div>
  );
};

export default Sidebar;
