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

  return (
    <div
      className={`flex ${
        sidebarVisible ? "w-64" : "w-0 bg-white"
      } bg-[#0C0E0F] text-white flex-col p-5 transition-all duration-300 min-h-screen`}
    >
      <div className="flex items-center justify-between mb-8 w-full relative">
        <img
          src={logo}
          alt="Logo"
          className={`h-10 w-auto ${!sidebarVisible && "hidden"}`}
        />

        <div
          className={`${
            sidebarVisible
              ? ""
              : "m-4 absolute inset-0 flex justify-center items-center"
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
            <ul className="space-y-1">
              {/* Dashboard Link */}
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `py-2 rounded flex items-center group transition-colors ${
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
                    `py-2 rounded flex items-center group transition-colors ${
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
                    `py-2 rounded flex items-center group transition-colors ${
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
                    `py-2 rounded flex items-center group transition-colors ${
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
                    `py-2 rounded flex items-center group transition-colors ${
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

              {/* Settings Group */}
              <li className="relative group/parent">
                {" "}
                {/* Unique group name for visibility logic */}
                <button className="py-2 rounded flex items-center w-full group transition-colors hover:bg-neutral-800">
                  <IoSettingsOutline className="mr-3 group-hover:text-black" />
                  <span className="text-dashboard group-hover:text-black">
                    Settings
                  </span>
                  <span className="ml-auto">
                    <FaChevronRight className="transition-all group-hover:rotate-90" />
                  </span>
                </button>
                {/* Sub-menu: Visible only when parent <li> is hovered */}
                <ul className="pl-6 mt-2 space-y-1 hidden group-hover/parent:block">
                  <li>
                    <NavLink
                      to="/editprofile"
                      className={({ isActive }) =>
                        `py-2 rounded flex items-center group transition-colors ${
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
                        `py-2 rounded flex items-center group transition-colors ${
                          isActive
                            ? "bg-white text-neutral-900"
                            : "hover:bg-neutral-800"
                        }`
                      }
                    >
                      <CiCircleInfo className="mr-3 group-hover:text-black" />
                      <span className="text-dashboard group-hover:text-black">
                        About Us
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/privacysettings"
                      className={({ isActive }) =>
                        `py-2 rounded flex items-center group transition-colors ${
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
                        `py-2 rounded flex items-center group transition-colors ${
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
