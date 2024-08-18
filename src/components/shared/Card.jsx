import { Card } from "flowbite-react";

export default function Component({ title, number }) {
  return (
    <Card href="#" className="w-[300px]">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900">
        {title}
      </h5>
      <p className="font-normal text-gray-700">Total: {number}</p>
    </Card>
  );
}
