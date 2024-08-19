import React from "react";
import Table from "../components/shared/Table";
import Form from "../components/shared/Form";
import { headerSt } from "../props/tables";
import { updateGrade } from "../props/forms";
import StudentServices from "../services/student.services";
import { useNavigate } from "react-router-dom";
import { Modal } from "flowbite-react";
import Button from "../components/shared/Button";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";

export default function Students() {
  const nav = useNavigate();
  const [students, setStudents] = React.useState([]);
  const [showUpdate, setShowUpdate] = React.useState(false);
  const [name, setName] = React.useState(null);
  const [roll, setRoll] = React.useState(null);
  const [grade, setGrade] = React.useState("");

  const onClick = () => {
    nav("/app/students/add");
  };

  const tupleClick = (tupleId) => {
    nav(`/app/students/${tupleId}`, { state: { id: tupleId } });
  };
  const updateClick = ({ RollNo, Name, Grade }) => {
    setShowUpdate(true);
    setName(Name);
    setRoll(RollNo);
    setGrade(Grade);
  };
  const onUpdate = async (formData) => {
    try {
      const ss = new StudentServices();
      await ss.updateGrade(formData, roll);
      setShowUpdate(false);
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    const fetchSt = async () => {
      try {
        const ss = new StudentServices();
        const res = await ss.getAll();
        setStudents(res);
        console.log(students);
      } catch (err) {
        setStudents([]);
      }
    };
    fetchSt();
  }, [students]);
  return (
    <div className="w-[100%] flex flex-col justify-center items-center gap-[10px] pt-[20px]">
      <Modal show={showUpdate} size={"md"} onClose={() => setShowUpdate(false)}>
        <Modal.Header>Update Grade for {name}</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-[20px]">
            <span className="">Current Grade: {grade}</span>
            <Form
              inputs={updateGrade}
              btnText={"Update"}
              onFormSubmit={onUpdate}
            />
          </div>
        </Modal.Body>
      </Modal>
      <h3 className="text-4xl font-semibold">Students</h3>
      <div className="w-[80%] flex justify-end">
        <div className="w-[150px]">
          <Button
            text={"Add new"}
            icon={faGraduationCap}
            onBtnClick={onClick}
          />
        </div>
      </div>
      <Table
        headers={headerSt}
        body={students}
        handleTupleClick={tupleClick}
        handleUpdateClick={updateClick}
      />
    </div>
  );
}
