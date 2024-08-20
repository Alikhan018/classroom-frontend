import React from "react";
import { Checkbox, Label } from "flowbite-react";
import FeatureServices from "../../services/features.services";
import Button from "./Button";

export default function CheckForm() {
  const [features, setFeatures] = React.useState([]);
  const [selectedFeatures, setSelectedFeatures] = React.useState([]);

  React.useEffect(() => {
    const fetchAll = async () => {
      const fs = new FeatureServices();
      const response = await fs.getAll();
      console.log(response);
      setFeatures(response);
    };
    fetchAll();
  }, []);

  const handleCheckboxChange = (entityType, name) => {
    setSelectedFeatures((prev) => {
      // Check if the feature is already selected
      const isSelected = prev.some(
        (feature) => feature.entityType === entityType && feature.name === name
      );

      if (isSelected) {
        // If already selected, remove it
        return prev.filter(
          (feature) =>
            !(feature.entityType === entityType && feature.name === name)
        );
      } else {
        // If not selected, add it
        return [...prev, { entityType, name }];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Features:", selectedFeatures);

    // Send `selectedFeatures` to the server or process it as needed
    // Example: axios.post('/your-api-endpoint', selectedFeatures)
  };

  return (
    <form className="flex flex-col gap-2 w-[80%]" onSubmit={handleSubmit}>
      <div className="flex max-w-md gap-4" id="checkbox">
        {features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            className="w-[300px] shadow-md flex flex-col p-[20px] rounded-lg gap-4 border border-gray-100 border-solid"
          >
            <div>
              <h3>{feature.entityType}</h3>
              <hr />
            </div>

            <div className="flex flex-wrap flex-row gap-4">
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
                    className="flex"
                  >
                    {name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Button text={"Create"} />
    </form>
  );
}
