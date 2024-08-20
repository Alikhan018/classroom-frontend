import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Button({ text, icon, onBtnClick }) {
  const onClick = () => {
    if (onBtnClick) {
      onBtnClick();
    }
  };
  return (
    <button
      type="submit"
      className={`w-[200px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center`}
      onClick={onClick}
    >
      <span className="pr-[15px]">{text}</span>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}
