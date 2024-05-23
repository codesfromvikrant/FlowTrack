const SelectInput = ({ data }) => {
  const renderOptionList =
    data &&
    Object.entries(data).map(([key, value]) => {
      return (
        <option key={key} value={value}>
          {value}
        </option>
      );
    });

  return (
    <select className="w-max outline-none bg-primary hover:bg-blue-700 text-gray-700 hover:text-gray-200 transition-all duration-500 text-sm py-2 px-5 shadow-md rounded-lg font-medium">
      {renderOptionList}
    </select>
  );
};

export default SelectInput;
