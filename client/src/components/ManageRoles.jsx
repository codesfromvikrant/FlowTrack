import React from "react";
import SearchBar from "./SearchBar";
import Button from "./Button";

const ManageRoles = () => {
  const inputClass =
    "text-slate-700 placeholder:text-slate-600 font-medium outline-none w-full text-sm py-2 px-2 bg-secondary rounded-md";
  return (
    <div className="space-y-2">
      <div className="flex justify-start items-center gap-3 min-w-full">
        <input
          type="text"
          placeholder="Enter User Email ID..."
          className={inputClass}
        />
        <Button label={"Invite"} active={true} className="w-max" />
      </div>

      <SearchBar
        placeholder={"Search Users"}
        className="shadow-none bg-secondary"
      />
    </div>
  );
};

export default ManageRoles;
