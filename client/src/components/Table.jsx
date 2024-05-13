const Table = ({ columns, data, handleClick }) => {
  return (
    <table className="w-full my-4">
      <thead className="text-gray-200">
        <tr>
          {columns?.map((column, index) => (
            <th key={index} className="font-medium capitalize text-start px-4">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-slate-400 gap-3">
        {data?.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            onClick={() => handleClick(row._id)}
            className="bg-primary rounded-md shadow-md capitalize cursor-pointer hover:bg-blue-700 hover:text-white transition-all duration-500"
          >
            {columns?.map((column, columnIndex) => (
              <td key={columnIndex} className="px-4 py-3">
                {row[column]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
