import { useState } from "react";

const MultipleSelectors = ({ buttonLabel, searchLabel }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchQuery = (e: any) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div>
      <button className="text-sm bg-secondary border-[1px] border-gray-800 px-2 py-4 rounded-md w-full text-start">
        Add In Collaborators
      </button>

      <div className="my-2 bg-secondary rounded-md p-2">
        <input
          type="text"
          name="search"
          value={searchQuery}
          onChange={handleSearchQuery}
          placeholder="Search users"
          className="bg-primary p-2 w-full rounded-md outline-none  border-[1px] border-gray-800"
        />
      </div>
    </div>
  );
};

export default MultipleSelectors;
