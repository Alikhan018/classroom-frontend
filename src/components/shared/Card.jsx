import { Link } from "react-router-dom";
import { checkPerm } from "../../utils/permissions.utils";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import IndexServices from "../../services/index.services";

export default function Component({ title }) {
  const [num, setNum] = useState(0);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const count = async () => {
      const is = new IndexServices();
      const count = await is.count(
        title.toLowerCase(),
        user.student.RollNo || user.teacher.TeacherId || null
      );
      console.log(count);
      setNum(count);
    };
    count();
  }, []);
  // const { permissions } = useContext(AuthContext);
  // if (!checkPerm(permissions, { name: "Read", entityType: title })) {
  //   return;
  // }

  return (
    <Link to={`/app/${title.toLowerCase()}`}>
      <div className="w-[300px] hover:text-blue-600 border border-solid border-gray-100 shadow-md rounded-lg px-[20px] py-[30px] hover:shadow-md hover:shadow-blue-200 hover:border-blue-100">
        <h5 className="text-2xl font-bold tracking-tight">{title}</h5>
        <p className="font-normal">Total: {num}</p>
      </div>
    </Link>
  );
}
