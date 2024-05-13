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
    <select className="w-max bg-primary border-[1px] border-gray-800 hover:bg-blue-700 text-gray-200 hover:text-white transition-all duration-500 text-sm py-3 px-5 shadow-md rounded-lg font-medium">
      {renderOptionList}
    </select>
  );
};

export default SelectInput;
