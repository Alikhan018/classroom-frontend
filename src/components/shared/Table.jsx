import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { checkPerm } from "../../utils/permissions.utils";

export default function Component({
  headers,
  body,
  ent,
  handleTupleClick,
  handleUpdateClick,
}) {
  const { permissions } = useContext(AuthContext);
  const [editPerm, setEditPerm] = useState(false);
  useEffect(() => {
    if (checkPerm(permissions, { name: "Update", entityType: ent })) {
      setEditPerm(true);
    } else {
      setEditPerm(false);
    }
  }, []);
  return (
    <div className="w-[80%] overflow-x-auto border border-gray-300 rounded-lg">
      <Table>
        <TableHead>
          {headers.map((header, index) => {
            if (header === "Actions" && editPerm) {
              return <></>;
            }
            return (
              <TableHeadCell className="bg-gray-200" key={index}>
                {header}
              </TableHeadCell>
            );
          })}
        </TableHead>
        <TableBody className="divide-y">
          {body.map((row) => {
            return (
              <>
                <TableRow
                  key={row.userId || row.id}
                  className="bg-white hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    handleTupleClick(row.RollNo || row.TeacherId || row.id);
                  }}
                >
                  {headers.map((key) => {
                    if (key === "Actions" && editPerm) {
                      return (
                        <>
                          <TableCell
                            className="text-blue-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUpdateClick(row);
                            }}
                            key={row[key]}
                          >
                            <FontAwesomeIcon icon={faPen} />
                          </TableCell>
                        </>
                      );
                    }
                    return <TableCell key={row[key]}>{row[key]}</TableCell>;
                  })}
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
