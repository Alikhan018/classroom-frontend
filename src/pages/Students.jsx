import React from "react";
import Table from "../components/shared/Table";
import Form from "../components/shared/Form";
import { headerSt } from "../props/tables";
import { updateGrade } from "../props/forms";
import StudentServices from "../services/student.services";
import { useNavigate } from "react-router-dom";
import { Modal } from "flowbite-react";

export default function Students() {
  const nav = useNavigate();
  const [students, setStudents] = React.useState([]);
  const [showUpdate, setShowUpdate] = React.useState(false);
  const [name, setName] = React.useState(null);
  const tupleClick = (tupleId) => {
    nav(`/app/students/${tupleId}`, { state: { id: tupleId } });
  };
  const updateClick = (tupleId, username) => {
    setShowUpdate(true);
    setName(username);
  };
  const onUpdate = (formData) => {
    console.log(formData);
  };
  React.useEffect(() => {
    const fetchSt = async () => {
      try {
        const ss = new StudentServices();
        const res = await ss.getAll();
        setStudents(res);
      } catch (err) {
        setStudents([]);
      }
    };
    fetchSt();
  }, []);
  return (
    <div className="w-[100%] flex flex-col justify-center items-center">
      <Modal show={showUpdate} size={"md"} onClose={() => setShowUpdate(false)}>
        <Modal.Header>Update Grade for {name}</Modal.Header>
        <Modal.Body>
          <Form
            inputs={updateGrade}
            btnText={"Update"}
            onFormSubmit={onUpdate}
          />
        </Modal.Body>
      </Modal>
      <Table
        headers={headerSt}
        body={students}
        handleTupleClick={tupleClick}
        handleUpdateClick={updateClick}
      />
    </div>
  );
}
