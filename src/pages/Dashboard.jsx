import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPen, faKey } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Button from "../components/shared/Button";

export default function Dashboard() {
  const nav = useNavigate();
  const { user } = React.useContext(AuthContext);
  return (
    <div className="w-full flex justify-center pt-6">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 pt-4">
        <div className="flex flex-col items-center pb-10">
          <FontAwesomeIcon icon={faUser} className="text-[34px]" />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Name: {user?.teacher?.Name || user?.student?.Name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {"Id "} : {user?.student?.RollNo || user?.teacher?.TeacherId}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {"Email"} : {user?.email}
          </span>
          <div className="flex mt-4 md:mt-6">
            <Button
              text={"Change Password"}
              icon={faKey}
              onBtnClick={() => {
                nav("/app/user/change-password");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
