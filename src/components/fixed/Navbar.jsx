import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import logo from "../../assets/images/logo.svg";
import user from "../../assets/images/user.svg";

export default function Navbar() {
  return (
    <nav className="bg-white border-gray-200">
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
                src={user}
                alt="User Menu"
              />
            }
            inline={true}
            arrowIcon={false}
          >
            <Dropdown.Header>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block text-sm font-medium text-gray-500">
                name@flowbite.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to="/">Dashboard</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/">Settings</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/">Sign out</Link>
            </Dropdown.Item>
          </Dropdown>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                to="/app/home"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/app/teachers"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                Teachers
              </Link>
            </li>
            <li>
              <Link
                to="/app/students"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                Students
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
