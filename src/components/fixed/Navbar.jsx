import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import logo from "../../assets/images/logo.svg";
import userSvg from "../../assets/images/user.svg";
import { AuthContext } from "../../context/AuthProvider";
import NavLinkItem from "../shared/NavLinkItem";
import { checkPerm } from "../../utils/permissions.utils";

export default function Navbar() {
  const [settings, setSettings] = React.useState(false);
  React.useEffect(() => {
    if (checkPerm(permissions, { name: "All", entityType: "Admin" })) {
      setSettings(true);
    } else {
      setSettings(false);
    }
  }, []);
  const nav = useNavigate();
  const { user, setToken, token, permissions } = React.useContext(AuthContext);
  const logout = () => {
    localStorage.removeItem("token");
    nav("/");
    window.location.reload();
  };
  return (
    <nav className="bg-white border-gray-200 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/app/home"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Classroom
          </span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Dropdown
            label={
              <img
                className="w-8 h-8 rounded-full"
                src={userSvg}
                alt="User Menu"
              />
            }
            inline={true}
            arrowIcon={false}
          >
            <Dropdown.Header>
              <span className="block text-sm">
                {user?.student?.Name || user?.teacher?.Name}
              </span>
              <span className="block text-sm font-medium text-gray-500">
                {user?.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to="/app/user">Dashboard</Link>
            </Dropdown.Item>
            {settings && (
              <Dropdown.Item>
                <Link to="/app/settings">Settings</Link>
              </Dropdown.Item>
            )}
            <Dropdown.Item>
              <span
                onClick={() => {
                  logout();
                }}
              >
                Sign out
              </span>
            </Dropdown.Item>
          </Dropdown>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <NavLinkItem link={"Home"} />
            <NavLinkItem link={"Teachers"} />
            <NavLinkItem link={"Students"} />
          </ul>
        </div>
      </div>
    </nav>
  );
}
