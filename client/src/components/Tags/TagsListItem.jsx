import React, { useState } from "react";

const TagsListItem = ({ data, checked, handleSelectedTags }) => {
  const [active, setActive] = useState(checked);

  const handleActive = () => {
    setActive(!active);
    handleSelectedTags(data._id);
  };
  return (
    <div className="bg-secondary hover:bg-gray-900 p-2 text-gray-200 text-sm rounded-md flex justify-start items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={active}
        onChange={handleActive}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <span>{data?.name}</span>
    </div>
  );
};

export default TagsListItem;
