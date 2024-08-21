import React from "react";
import { Modal } from "flowbite-react";
import Form from "./Form";

export default function Component({
  headerTitle,
  details,
  onUpdate,
  formInputs,
}) {
  const [showUpdate, setShowUpdate] = React.useState(true);
  return (
    <div>
      <Modal show={showUpdate} size={"md"} onClose={() => setShowUpdate(false)}>
        <Modal.Header>{headerTitle}</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-[20px]">
            <span className="">{details}</span>
            <Form
              inputs={formInputs}
              btnText={"Update"}
              onFormSubmit={onUpdate}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
