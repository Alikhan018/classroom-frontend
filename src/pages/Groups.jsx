import React from "react";
import Button from "../components/shared/Button";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { headerRGs } from "../props/tables";
import Table from "../components/shared/Table";
import { useNavigate } from "react-router-dom";
import GroupServices from "../services/groups.services";

export default function Groups() {
  const nav = useNavigate();
  const [groups, setGroups] = React.useState([]);
  React.useEffect(() => {
    const fetchSt = async () => {
      try {
        const gs = new GroupServices();
        const res = await gs.getAllGroups();
        setGroups(res);
      } catch (err) {
        setGroups([]);
      }
    };
    fetchSt();
  }, []);
  const updateClick = ({ id }) => {
    nav(`/app/groups/${id}`, { state: { id } });
  };
  const tupleClick = (tupleId) => {
    nav(`/app/groups/${tupleId}`, { state: { id: tupleId } });
  };
  const onClick = () => {
    nav("/app/groups/create");
  };
  return (
    <div className="w-[100%] flex flex-col justify-center items-center gap-[10px] pt-[20px]">
      <h3 className="text-4xl font-semibold">Groups</h3>
      <div className="w-[73%] flex justify-end">
        <div className="w-[150px]">
          <Button text={"Add new"} icon={faUserGroup} onBtnClick={onClick} />
        </div>
      </div>
      <Table
        headers={headerRGs}
        body={groups}
        handleTupleClick={tupleClick}
        handleUpdateClick={updateClick}
      />
    </div>
  );
}
