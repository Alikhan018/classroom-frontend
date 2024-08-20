import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { checkPerm } from "../../utils/permissions.utils";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

export default function Component({ title, number }) {
  const { permissions } = useContext(AuthContext);
  if (checkPerm(permissions, { name: "Read", entityType: title })) {
    return;
  }
  return (
    <Link to={`/app/${title.toLowerCase()}`}>
      <div className="w-[300px] hover:text-blue-600 border border-solid border-gray-100 shadow-md rounded-lg px-[20px] py-[30px] ">
        <h5 className="text-2xl font-bold tracking-tight">{title}</h5>
        <p className="font-normal">Total: {number}</p>
      </div>
    </Link>
  );
}
