import React from "react";
import Card from "../components/shared/Card";

export default function Home() {
  return (
    <div className="w-[100%] p-[20px] flex justify-center">
      <div className="w-[90%] flex flex-wrap gap-[20px]">
        <Card title={"Teachers"} />
        <Card title={"Students"} />
      </div>
    </div>
  );
}
