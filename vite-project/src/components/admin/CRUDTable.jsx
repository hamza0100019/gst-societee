import React from "react";

const CRUDTable = ({ columns, data, onEdit, onDelete }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="py-2 px-4 border-b font-bold text-left bg-gray-100"
              >
                {column}
              </th>
            ))}
            <th className="py-2 px-4 border-b font-bold text-left bg-gray-100">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-100">
              {columns.map((column) => (
                <td key={column} className="py-2 px-4 border-b">
                  {row[column.toLowerCase()] || "N/A"}
                </td>
              ))}
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => onEdit(row)}
                  className="text-blue-500 hover:underline mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(row.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CRUDTable;
