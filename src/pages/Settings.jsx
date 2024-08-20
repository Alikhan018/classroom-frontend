import React from "react";
import Card from "../components/shared/Card";
export default function Settings() {
  return (
    <div className="w-[100%] flex justify-center pt-5">
      <div className="w-[87%] flex flex-col gap-3 pt-5">
        <h3 className="text-3xl font-semibold">Settings</h3>
        <div className="flex gap-[30px]">
          <Card title={"Roles"} />
          <Card title={"Groups"} />
        </div>
      </div>
    </div>
  );
}
