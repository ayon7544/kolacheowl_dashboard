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

  /**
   * Reusable Component for Sidebar Links
   * Handles the "Active" logic (White bg / Black text)
   * and "Hover" logic (Neutral-800 bg / White text)
   */
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
      className={`flex ${
        sidebarVisible ? "w-64" : "w-0 overflow-hidden"
      } bg-[#0C0E0F] text-white flex-col p-5 transition-all duration-300 min-h-screen border-r border-neutral-800`}
    >
      {/* Header / Logo Section */}
      <div className="flex items-center justify-between mb-8 w-full relative">
        <img
          src={logo}
          alt="Logo"
          className={`h-10 w-auto transition-opacity duration-300 ${
            !sidebarVisible ? "opacity-0" : "opacity-100"
          }`}
        />

        <div
          className={`${
            sidebarVisible
              ? ""
              : "absolute left-0 top-0 flex justify-center items-center"
          }`}
        >
          <button
            onClick={toggleSidebar}
            className={`${
              sidebarVisible ? "h-full" : "h-12 w-12 bg-neutral-800 rounded-2xl"
            } text-white flex items-center justify-center focus:outline-none hover:bg-neutral-700 transition-colors`}
          >
            <FaBars className="w-5 h-5" />
          </button>
        </div>
      </div>

      {sidebarVisible && (
        <>
          <nav className="flex-1">
            <ul className="space-y-2">
              {/* Main Navigation */}
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
                label="Blog Posts"
              />
              <SidebarItem
                to="/worldandthemes"
                icon={MdOutlineCategory}
                label="World & Themes"
              />

              {/* Settings Dropdown Group */}
              <li className="relative group/parent pt-2">
                <button className="w-full px-4 py-3 rounded-2xl flex items-center group transition-all text-white hover:bg-neutral-800">
                  <IoSettingsOutline className="mr-3 size-5 group-hover:text-white" />
                  <span className="font-medium group-hover:text-white">
                    Settings
                  </span>
                  <span className="ml-auto">
                    <FaChevronRight className="w-3 h-3 transition-transform duration-300 group-hover/parent:rotate-90" />
                  </span>
                </button>

                {/* Sub-menu: Hidden by default, shows on parent hover */}
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

          {/* Footer / Logout */}
          <div className="pt-4 border-t border-neutral-800">
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
      )}
    </div>
  );
};

export default Sidebar;
