import React from "react";
import { Checkbox, Label } from "flowbite-react";
import FeatureServices from "../../services/features.services";
import Button from "./Button";

export default function CheckForm({ onSubmit }) {
  const [features, setFeatures] = React.useState([]);
  const [selectedFeatures, setSelectedFeatures] = React.useState([]);

  React.useEffect(() => {
    const fetchAll = async () => {
      const fs = new FeatureServices();
      const response = await fs.getAll();
      setFeatures(response);
    };
    fetchAll();
  }, []);

  const handleCheckboxChange = (entityType, name) => {
    setSelectedFeatures((prev) => {
      const isSelected = prev.some(
        (feature) => feature.entityType === entityType && feature.name === name
      );

      if (isSelected) {
        return prev.filter(
          (feature) =>
            !(feature.entityType === entityType && feature.name === name)
        );
      } else {
        return [...prev, { entityType, name }];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedFeatures);
  };

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
      <div className="flex flex-wrap w-full gap-[30px]" id="checkbox">
        {features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            className="w-[200px]shadow-md flex flex-col p-4 rounded-lg gap-4 border border-gray-100"
          >
            <div>
              <h3 className="text-lg font-semibold">{feature.entityType}</h3>
              <hr />
            </div>

            <div className="w-full flex flex-wrap gap-4">
              {feature.names.map((name, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Checkbox
                    id={`${feature.entityType}-${index}`}
                    checked={selectedFeatures.some(
                      (selected) =>
                        selected.entityType === feature.entityType &&
                        selected.name === name
                    )}
                    onChange={() =>
                      handleCheckboxChange(feature.entityType, name)
                    }
                  />
                  <Label
                    htmlFor={`${feature.entityType}-${index}`}
                    className="text-sm font-medium"
                  >
                    {name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Button text={"Create"} className="mt-4" />
    </form>
  );
}
