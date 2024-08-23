import React from "react";
import Button from "../components/shared/Button";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import RolesServices from "../services/roles.services";
import { headerRGs } from "../props/tables";
import Table from "../components/shared/Table";
import { useNavigate } from "react-router-dom";

export default function Roles() {
  const nav = useNavigate();
  const [roles, setRoles] = React.useState([]);
  React.useEffect(() => {
    const fetchSt = async () => {
      try {
        const rs = new RolesServices();
        const res = await rs.getAllRoles();
        console.log(res);
        setRoles(res);
      } catch (err) {
        setRoles([]);
      }
    };
    fetchSt();
  }, []);
  const updateClick = ({ id }) => {
    nav(`/app/roles/${id}`, { state: { id } });
  };
  const tupleClick = (tupleId) => {
    nav(`/app/roles/${tupleId}`, { state: { id: tupleId } });
  };
  const onClick = () => {
    nav("/app/roles/create");
  };
  return (
    <div className="w-[100%] flex flex-col justify-center items-center gap-[10px] pt-[20px]">
      <h3 className="text-4xl font-semibold">Roles</h3>
      <div className="w-[73%] flex justify-end">
        <div className="w-[150px]">
          <Button text={"Add new"} icon={faGear} onBtnClick={onClick} />
        </div>
      </div>
      <Table
        headers={headerRGs}
        body={roles}
        handleTupleClick={tupleClick}
        handleUpdateClick={updateClick}
      />
    </div>
  );
}
