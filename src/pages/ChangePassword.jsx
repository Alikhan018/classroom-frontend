import React from "react";
import { prevPass } from "../props/forms";
import Form from "../components/shared/Form";
import { AuthContext } from "../context/AuthProvider";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [err, setError] = React.useState(false);
  const nav = useNavigate();
  const { user } = React.useContext(AuthContext);
  const onFormSubmit = async ({ password }) => {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      setError(false);
      nav("/app/user/change-password/new", { state: { match: true } });
    } else {
      setError(true);
    }
  };
  return (
    <div
      className=" absolute top-[30%] left-[50%] w-[400px] p-4 bg-gray-100 flex flex-col justify-center rounded-md gap-4 shadow-md"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      {err && (
        <span className="text-red-600 text-sm">
          Password didnt matched to previous password
        </span>
      )}
      <h3 className="text-xl font-semibold">Enter your Previous Password</h3>
      <Form inputs={prevPass} btnText={"Submit"} onFormSubmit={onFormSubmit} />
    </div>
  );
}
