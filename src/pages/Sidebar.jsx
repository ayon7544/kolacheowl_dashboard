import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaSignOutAlt,
  FaChevronUp,
  FaChevronRight,
} from "react-icons/fa";
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
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [logout, { isLoading }] = useLogoutMutation();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Toggles the visibility of the sidebar (expand or collapse)
  const toggleSidebar = () => {
    // When collapsing the sidebar, close the dropdown as well
    if (sidebarVisible) {
      setIsOpen(false); // Close dropdown when sidebar is collapsed
    }
    setSidebarVisible(!sidebarVisible);
  };

  const handleLogout = async () => {
    try {
      // 5. Call the API
      await logout().unwrap();

      // 6. Clear local storage and cookies
      deleteCookie("NessasBrokenWorldAuthToken");
      localStorage.removeItem("user");

      toast.success("Logged out successfully");

      // 7. Redirect to login
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  return (
    <div
      className={`flex ${
        sidebarVisible ? "w-64" : "w-0 bg-white"
      } bg-[#0C0E0F] text-white flex-col p-5 transition-all duration-300 min-h-screen`}
    >
      <div className="flex items-center justify-between mb-8 w-full relative">
        {/* Logo visibility */}
        <img
          src={logo}
          alt="Logo"
          className={`h-10 w-auto ${!sidebarVisible && "hidden"}`}
        />

        {/* Hamburger Button Container */}
        <div
          className={`${
            sidebarVisible
              ? "" // Show normally when sidebar is visible
              : "m-4 absolute inset-0 flex justify-center items-center" // Center the button when collapsed
          }`}
        >
          <button
            onClick={toggleSidebar}
            className={`${
              sidebarVisible ? "h-full" : "h-12 w-12 bg-black rounded-2xl p-2"
            } text-white focus:outline-none`}
          >
            <FaBars className="w-6 h-6" />
          </button>
        </div>
      </div>

      {sidebarVisible && (
        <>
          <nav>
            <ul>
              {/* Dashboard Link */}
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `py-2 rounded flex items-center group ${
                      isActive
                        ? "bg-white text-neutral-900"
                        : "hover:bg-neutral-800"
                    }`
                  }
                >
                  <LuLayoutDashboard className="mr-3 group-hover:text-black" />
                  <span className="text-dashboard group-hover:text-black">
                    Dashboard
                  </span>
                </NavLink>
              </li>

              {/* Books Link */}
              <li>
                <NavLink
                  to="/books"
                  className={({ isActive }) =>
                    `py-2 rounded flex items-center group ${
                      isActive
                        ? "bg-white text-neutral-900"
                        : "hover:bg-neutral-800"
                    }`
                  }
                >
                  <HiOutlineBookOpen className="mr-3 group-hover:text-black" />
                  <span className="text-dashboard group-hover:text-black">
                    Books
                  </span>
                </NavLink>
              </li>

              {/* Characters Link */}
              <li>
                <NavLink
                  to="/characters"
                  className={({ isActive }) =>
                    `py-2 rounded flex items-center group ${
                      isActive
                        ? "bg-white text-neutral-900"
                        : "hover:bg-neutral-800"
                    }`
                  }
                >
                  <LiaUserFriendsSolid className="mr-3 group-hover:text-black" />
                  <span className="text-dashboard group-hover:text-black">
                    Characters
                  </span>
                </NavLink>
              </li>

              {/* Blog Posts Link */}
              <li>
                <NavLink
                  to="/blogs"
                  className={({ isActive }) =>
                    `py-2 rounded flex items-center group ${
                      isActive
                        ? "bg-white text-neutral-900"
                        : "hover:bg-neutral-800"
                    }`
                  }
                >
                  <IoDocumentTextOutline className="mr-3 group-hover:text-black" />
                  <span className="text-dashboard group-hover:text-black">
                    Blog Posts
                  </span>
                </NavLink>
              </li>

              {/* World & Themes Link */}
              <li>
                <NavLink
                  to="/worldandthemes"
                  className={({ isActive }) =>
                    `py-2 rounded flex items-center group ${
                      isActive
                        ? "bg-white text-neutral-900"
                        : "hover:bg-neutral-800"
                    }`
                  }
                >
                  <MdOutlineCategory className="mr-3 group-hover:text-black" />
                  <span className="text-dashboard group-hover:text-black">
                    World & Themes
                  </span>
                </NavLink>
              </li>

              {/* Dropdown for Settings */}
              <li>
                <button
                  onClick={toggleDropdown}
                  className="py-2 rounded flex items-center w-full group"
                >
                  <IoSettingsOutline className="mr-3 group-hover:text-black" />
                  <span className="text-dashboard group-hover:text-black">
                    Settings
                  </span>
                  <span
                    className={`ml-auto group-hover:text-black ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    {isOpen ? <FaChevronUp /> : <FaChevronRight />}
                  </span>
                </button>

                {/* Apply a smooth transition to the dropdown */}
                <ul
                  className={`pl-6 mt-2 space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-60" : "max-h-0"
                  }`}
                >
                  <li>
                    <NavLink
                      to="/editprofile"
                      className={({ isActive }) =>
                        `py-2 rounded flex items-center group ${
                          isActive
                            ? "bg-white text-neutral-900"
                            : "hover:bg-neutral-800"
                        }`
                      }
                    >
                      <CgProfile className="mr-3 group-hover:text-black" />
                      <span className="text-dashboard group-hover:text-black">
                        Edit Profile
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/accountsettings"
                      className={({ isActive }) =>
                        `py-2 rounded flex items-center group ${
                          isActive
                            ? "bg-white text-neutral-900"
                            : "hover:bg-neutral-800"
                        }`
                      }
                    >
                      <CiCircleInfo className="mr-3 group-hover:text-black" />
                      <span className="text-dashboard group-hover:text-black">
                        Account Settings
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/privacysettings"
                      className={({ isActive }) =>
                        `py-2 rounded flex items-center group ${
                          isActive
                            ? "bg-white text-neutral-900"
                            : "hover:bg-neutral-800"
                        }`
                      }
                    >
                      <MdOutlinePrivacyTip className="mr-3 group-hover:text-black" />
                      <span className="text-dashboard group-hover:text-black">
                        Privacy Settings
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/termsandconditions"
                      className={({ isActive }) =>
                        `py-2 rounded flex items-center group ${
                          isActive
                            ? "bg-white text-neutral-900"
                            : "hover:bg-neutral-800"
                        }`
                      }
                    >
                      <FaRegNewspaper className="mr-3 group-hover:text-black" />
                      <span className="text-dashboard group-hover:text-black">
                        Terms & Conditions
                      </span>
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>

          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="mt-auto text-gray-400 hover:text-white flex items-center transition-colors disabled:opacity-50"
          >
            <FaSignOutAlt className="mr-3" />
            <span className="text-dashboard">
              {isLoading ? "Logging out..." : "Log out"}
            </span>
          </button>
        </>
      )}
    </div>
  );
};

export default Sidebar;
