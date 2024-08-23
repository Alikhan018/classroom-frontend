import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import IndexServices from "../services/index.services";
import {
  faGraduationCap,
  faPen,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../components/shared/Modal";
import { updateGrade, updateTeacher } from "../props/forms";
import StudentServices from "../services/student.services";
import TeacherServices from "../services/teacher.services";
import { checkPerm } from "../utils/permissions.utils";
import { AuthContext } from "../context/AuthProvider";

export default function ViewEntityPage({ entity }) {
  const nav = useNavigate();
  const loc = useLocation();
  const id = loc.state.id;
  const [data, setData] = React.useState({});
  const [icon, setIcon] = React.useState(null);
  const [showUpdate, setShowUpdate] = React.useState(false);
  const [editPerm, setEditPerm] = React.useState(false);
  const { permissions } = React.useContext(AuthContext);

  React.useEffect(() => {
    if (
      checkPerm(permissions, {
        name: "Update",
        entityType: entity.charAt(0).toUpperCase() + entity.slice(1, -1) + "s",
      })
    ) {
      setEditPerm(true);
    } else {
      setEditPerm(false);
    }
  }, []);
  React.useEffect(() => {
    const fetch = async () => {
      const url = `${entity}/${id}`;
      const is = new IndexServices();
      const res = await is.fetchData(url);
      setData(res);
      if (res.TeacherId) {
        setIcon(faUserGraduate);
      } else {
        setIcon(faGraduationCap);
      }
    };
    fetch();
  }, [id, entity]);

  const onUpdateSt = async (formData) => {
    try {
      const ss = new StudentServices();
      await ss.updateGrade(formData, data?.RollNo);
      setShowUpdate(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onUpdateTch = async (formData) => {
    try {
      const ts = new TeacherServices();
      await ts.update(formData, data?.TeacherId);
      setShowUpdate(false);
      nav(`/app/teachers/${data.TeacherId}`, {
        state: { id: data?.TeacherId },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const props = React.useMemo(() => {
    if (entity === "students") {
      return {
        headerTitle: `Update Grade for ${data?.Name || ""}`,
        details: `Current Grade: ${data?.Grade || ""}`,
        formInputs: updateGrade,
        onUpdate: onUpdateSt,
      };
    }
    return {
      headerTitle: `Update Details for ${data?.Name || ""}`,
      details: `Current Name: ${data?.Name || ""} \n Current Address : ${
        data?.Address || ""
      }`,
      formInputs: updateTeacher,
      onUpdate: onUpdateTch,
    };
  }, [entity, data]);

  return (
    <div className="w-full flex justify-center pt-6">
      {showUpdate && <Modal {...props} />}
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 pt-4">
        {editPerm && (
          <div className="flex justify-end px-4 pt-4">
            <FontAwesomeIcon
              icon={faPen}
              className="cursor-pointer hover:text-blue-700"
              onClick={() => {
                setShowUpdate(true);
              }}
            />
          </div>
        )}
        <div className="flex flex-col items-center pb-10">
          <FontAwesomeIcon icon={icon} className="text-[34px]" />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Name: {data.Name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {"Id "} : {data?.RollNo || data?.TeacherId}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {"Email"} : {data?.users?.email}
          </span>
          <div className="flex mt-4 md:mt-6"></div>
        </div>
      </div>
    </div>
  );
}
