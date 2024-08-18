import React from "react";
import Form from "../components/shared/Form";
import { useNavigate } from "react-router-dom";
import UserServices from "../services/user.services";
import { login } from "../props/forms";

export default function Login() {
  const nav = useNavigate();
  const onSubmit = async (formData) => {
    const us = new UserServices();
    try {
      const res = await us.login(formData);
      console.log(formData);
      console.log(res);
      if (res.message === "Logged in") {
        console.log(res);
        nav("/home");
      }
    } catch (err) {}
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-[100%] h-[100vh] bg-gray-100">
        <Form inputs={login} onFormSubmit={onSubmit} />
      </div>
    </>
  );
}
