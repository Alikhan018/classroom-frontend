import React, { useContext } from "react";
import Button from "../components/shared/Button";
import { headerTc } from "../props/tables";
import Table from "../components/shared/Table";
import TeacherServices from "../services/teacher.services";
import { useNavigate } from "react-router-dom";
import { faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import { updateTeacher } from "../props/forms";
import Form from "../components/shared/Form";
import { AuthContext } from "../context/AuthProvider";
import { checkPerm } from "../utils/permissions.utils";
import Modal from "../components/shared/Modal";

export default function Teachers() {
  const nav = useNavigate();
  const { permissions, user } = useContext(AuthContext);
  const [teachers, setTeachers] = React.useState([]);
  const [showUpdate, setShowUpdate] = React.useState(false);
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [tId, setTId] = React.useState("");
  const [addPerms, setAddPerms] = React.useState(false);

  const onBtnClick = () => {
    nav("/app/teachers/add");
  };

  const tupleClick = (tupleId) => {
    nav(`/app/teachers/${tupleId}`, { state: { id: tupleId } });
  };
  const updateClick = ({ TeacherId, Name, Address }) => {
    setShowUpdate(true);
    setName(Name);
    setAddress(Address);
    setTId(TeacherId);
  };
  const onUpdate = async (formData) => {
    try {
      const ts = new TeacherServices();
      await ts.update(formData, tId);
      setShowUpdate(false);
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    if (checkPerm(permissions, { name: "Create", entityType: "Teachers" })) {
      setAddPerms(true);
    } else {
      setAddPerms(false);
    }
  }, []);
  React.useEffect(() => {
    const fetchTc = async () => {
      try {
        const ts = new TeacherServices();
        console.log(user);
        const res = await ts.getAll(user.student.RollNo);
        setTeachers(res);
      } catch (err) {
        setTeachers([]);
      }
    };
    fetchTc();
  }, []);
  return (
    <>
      <div className="w-[100%] flex flex-col justify-center items-center gap-[10px] pt-[20px]">
        {showUpdate && (
          <Modal
            headerTitle={`Update Details for ${name}`}
            details={`Current Name: ${name} <br /> Current Address : ${address}`}
            onUpdate={onUpdate}
            formInputs={updateTeacher}
          />
        )}
        <h3 className="text-4xl font-semibold">Teachers</h3>
        {addPerms && (
          <div className="w-[80%] flex justify-end">
            <div className="w-[150px]">
              <Button
                text={"Add new"}
                icon={faUserGraduate}
                onBtnClick={onBtnClick}
              />
            </div>
          </div>
        )}
        {teachers && (
          <Table
            ent={"Teachers"}
            headers={headerTc}
            body={teachers}
            handleTupleClick={tupleClick}
            handleUpdateClick={updateClick}
          />
        )}
      </div>
    </>
  );
}
