import React from "react";
import Table from "../components/shared/Table";
import Form from "../components/shared/Form";
import { headerSt } from "../props/tables";
import { updateGrade } from "../props/forms";
import StudentServices from "../services/student.services";
import { useNavigate } from "react-router-dom";
import Modal from "../components/shared/Modal";
import Button from "../components/shared/Button";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { checkPerm } from "../utils/permissions.utils";
import { AuthContext } from "../context/AuthProvider";

export default function Students() {
  const nav = useNavigate();
  const [students, setStudents] = React.useState([]);
  const [showUpdate, setShowUpdate] = React.useState(false);
  const [name, setName] = React.useState(null);
  const [roll, setRoll] = React.useState(null);
  const [grade, setGrade] = React.useState("");
  const { permissions, user } = React.useContext(AuthContext);

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
        let res;
        if (checkPerm(permissions, { name: "All", entityType: "Admin" })) {
          res = await ss.getAllAdmin();
        } else {
          res = await ss.getAll(user.teacher.TeacherId);
        }
        setStudents(res);
        console.log(students);
      } catch (err) {
        setStudents([]);
      }
    };
    fetchSt();
  }, []);
  return (
    <div className="w-[100%] flex flex-col justify-center items-center gap-[10px] pt-[20px]">
      {showUpdate && (
        <Modal
          headerTitle={`Update Grade for ${name}`}
          details={`Current Grade: ${grade}`}
          formInputs={updateGrade}
          onUpdate={onUpdate}
        />
      )}
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
