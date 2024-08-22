import React from "react";
import Form from "../components/shared/Form";
import { newPass } from "../props/forms";
import UserServices from "../services/user.services";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function NewPassword() {
  const [err, setError] = React.useState(false);
  const { user } = React.useContext(AuthContext);
  const nav = useNavigate();
  const loc = useLocation();
  if (!loc?.state?.match) {
    nav("/app/user/change-password");
    return;
  }
  const onFormSubmit = async (formData) => {
    const us = new UserServices();
    const res = await us.changePasswordForUser(formData, user.id);
    if (res === "Not matched") {
      setError(true);
    } else {
      setError(false);
      nav("/app/user");
    }
  };
  return (
    <div
      className=" absolute top-[30%] left-[50%] w-[400px] p-4 bg-gray-100 flex flex-col justify-center rounded-md gap-4 shadow-md"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      {err && (
        <span className="text-red-600 text-sm">
          Passwords are not same. Try again
        </span>
      )}
      <h3 className="text-xl font-semibold">Enter your Previous Password</h3>
      <Form inputs={newPass} btnText={"Submit"} onFormSubmit={onFormSubmit} />
    </div>
  );
}
