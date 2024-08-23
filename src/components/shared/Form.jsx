import React, { useState } from "react";
import Button from "./Button";

export default function Form({ inputs, onFormSubmit, btnText }) {
  const [formData, setFormData] = useState(null);
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onFormSubmit(formData);
  };
  return (
    <form className="flex flex-col items-end" onSubmit={handleSubmit}>
      {inputs.map((input, index) => {
        return (
          <div key={index} className="mb-5 w-[100%]">
            <label
              htmlFor={input.label}
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              {input.label.toUpperCase()}
            </label>
            <input
              type={input.type}
              id={input.id}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder={input.placeholder}
              required={input.required}
            />
          </div>
        );
      })}
      <Button text={btnText} />
    </form>
  );
}
