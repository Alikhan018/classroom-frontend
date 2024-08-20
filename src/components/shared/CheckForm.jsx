import React from "react";
import { Checkbox, Label } from "flowbite-react";
import FeatureServices from "../../services/features.services";

export default function CheckForm() {
  const [features, setFeatures] = React.useState([]);
  React.useEffect(() => {
    const fetchAll = async () => {
      const fs = new FeatureServices();
      const response = await fs.getAll();
      console.log(response);
      setFeatures(response);
    };
    fetchAll();
  }, []);
  return (
    <div className="flex max-w-md flex-col gap-4" id="checkbox">
      {features.map((feature) => {
        return (
          <div className="w-[300px] shadow-md flex flex-col p-[20px] rounded-lg gap-4 border border-gray-100 border-solid">
            <div>
              <h3>{feature.entityType}</h3>
              <hr />
            </div>

            <div className="flex flex-wrap gap-4">
              {feature.names.map((name, index) => {
                return (
                  <div className="flex gap-2 items-center">
                    <Checkbox id={index} />
                    <Label htmlFor={index} className="flex">
                      {name}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
