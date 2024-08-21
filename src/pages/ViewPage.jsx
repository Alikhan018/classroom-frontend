import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import IndexServices from "../services/index.services";
import CheckForm from "../components/shared/CheckForm";
import { Label, TextInput } from "flowbite-react";

export default function ViewPage({ entity }) {
  const nav = useNavigate();
  const loc = useLocation();
  const id = loc.state.id;
  const [data, setData] = React.useState([]);
  const [formName, setFormName] = React.useState(data?.name);
  React.useEffect(() => {
    const fetch = async () => {
      const url = `${entity}/${id}`;
      const is = new IndexServices();
      const res = await is.fetchData(url);
      setFormName(res.name);
      setData(res);
    };
    fetch();
  }, []);
  const handleChange = (e) => {
    setFormName(e.target.value);
  };
  const handleSubmit = async (features) => {
    const is = new IndexServices();
    await is.update({ id, name: formName, features }, entity);
    nav(`/app/${entity}`);
  };
  return (
    <div className="flex w-full p-4 w-full justify-center">
      <div className="flex flex-col p-4 gap-[40px] bg-gray-100 rounded-2xl shadow-lg">
        <div className="flex flex-col gap-2 w-[300px]">
          <h3 className="text-2xl font-semibold">
            {entity.charAt(0).toUpperCase() + entity.slice(1, -1)} Name:{" "}
            {data?.name}
          </h3>
          <span className="text-sm">Users: {data?.users?.length}</span>
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
              value={formName}
              onChange={handleChange}
            />
          </div>
          <CheckForm onSubmit={handleSubmit} btnText={"Update"} />
        </div>
      </div>
    </div>
  );
}
