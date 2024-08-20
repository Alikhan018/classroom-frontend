import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { checkPerm } from "../../utils/permissions.utils";

export default function NavLinkItem({ link }) {
  const { permissions } = useContext(AuthContext);
  if (
    link !== "Home" &&
    !checkPerm(permissions, { name: "Read", entityType: link })
  ) {
    return;
  }
  return (
    <li>
      <Link
        to={`/app/${link.toLowerCase()}`}
        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
        aria-current="page"
      >
        {link}
      </Link>
    </li>
  );
}
