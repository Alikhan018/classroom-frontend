import React from "react";
import Form from "../components/shared/Form";
import { useNavigate } from "react-router-dom";
import UserServices from "../services/user.services";
import { login } from "../props/forms";
import { AuthContext } from "../context/AuthProvider";

export default function Login() {
  const [err, setError] = React.useState(false);
  const nav = useNavigate();
  const { token, setToken } = React.useContext(AuthContext);
  if (token) {
    nav("/app/home");
  }

  const onSubmit = async (formData) => {
    const us = new UserServices();
    try {
      const res = await us.login(formData);
      if (res.message === "Logged in") {
        localStorage.setItem("token", res.token);
        setToken(res.token);
        setError(false);
        nav("/app/home");
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-[100%] h-[100vh] bg-gray-100">
        <div className="w-[300px]">
          {err && <span className="text-red-700">An error occured</span>}
          <Form inputs={login} onFormSubmit={onSubmit} btnText={"Login"} />
        </div>
      </div>
    </>
  );
}
