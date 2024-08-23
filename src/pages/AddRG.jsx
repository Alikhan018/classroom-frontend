import React from "react";
import { useNavigate } from "react-router-dom";
import IndexServices from "../services/index.services";
import CheckForm from "../components/shared/CheckForm";
import { Label, TextInput } from "flowbite-react";

export default function ViewPage({ entity }) {
  const nav = useNavigate();
  const [name, setName] = React.useState("");
  React.useEffect(() => {
    const fetch = async () => {};
    fetch();
  }, []);
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = async (features) => {
    const is = new IndexServices();
    await is.create(entity, { name: name, features });
    nav(`/app/${entity}`);
  };
  return (
    <div className="flex w-full p-4 w-full justify-center">
      <div className="flex flex-col p-4 gap-[40px] bg-gray-100 rounded-2xl shadow-lg">
        <div className="flex flex-col gap-2 w-[300px]">
          <h3 className="text-2xl font-semibold">
            Create {entity.charAt(0).toUpperCase() + entity.slice(1, -1)}
          </h3>
          <hr />
        </div>
        <div className="w-[100%] flex flex-col gap-4">
          <div className="w-[200px]">
            <div className="mb-2 block">
              <Label
                htmlFor="name"
                value={`${
                  entity.charAt(0).toUpperCase() + entity.slice(1, -1)
                } name`}
              />
            </div>
            <TextInput
              id="name"
              type="text"
              required
              value={name}
              onChange={handleChange}
            />
          </div>
          <CheckForm onSubmit={handleSubmit} btnText={"Create"} />
        </div>
      </div>
    </div>
  );
}
