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

export default function Component({
  headers,
  body,
  handleTupleClick,
  handleUpdateClick,
}) {
  return (
    <div className="w-[80%] overflow-x-auto border border-gray-300 rounded-lg">
      <Table>
        <TableHead>
          {headers.map((header, index) => {
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
                  key={row.userId}
                  className="bg-white hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    handleTupleClick(row.RollNo || row.TeacherId);
                  }}
                >
                  {headers.map((key) => {
                    if (key === "Actions") {
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
