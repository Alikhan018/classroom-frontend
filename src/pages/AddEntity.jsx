import React from "react";
import Form from "../components/shared/Form";
import { addStudent, addTeacher } from "../props/forms";
import TeacherServices from "../services/teacher.services";
import { useNavigate } from "react-router-dom";
import StudentServices from "../services/student.services";

export default function AddEntity({ entity }) {
  const nav = useNavigate();
  const [inputs, setInputs] = React.useState([]);

  React.useEffect(() => {
    if (entity === "teachers") {
      setInputs(addTeacher);
    } else if (entity === "students") {
      setInputs(addStudent);
    }
  }, [entity]);
  const addSubmit = async (formData) => {
    if (entity === "teachers") {
      const ts = new TeacherServices();
      await ts.create(formData);
      nav("/app/teachers");
    }
    if (entity === "students") {
      const ss = new StudentServices();
      await ss.create(formData);
      nav("/app/students");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center p-[20px] gap-[20px] bg-gray-100">
      <h3 className="text-3xl font-semibold md:uppercase">Add new {entity}</h3>
      <div className="w-[400px]">
        <Form
          inputs={inputs}
          btnText={`Add new ${entity.slice(0, -1)}`}
          onFormSubmit={addSubmit}
        />
      </div>
    </div>
  );
}
