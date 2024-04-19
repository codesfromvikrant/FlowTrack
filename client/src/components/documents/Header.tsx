import React, { useState } from "react";
import { BiSolidAddToQueue } from "react-icons/bi";
import { HiDocument } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import { ImPriceTags } from "react-icons/im";
import { useNavigate, useSearchParams } from "react-router-dom";
import FilterTags from "./documentTags/FilterTags";

const Header = ({ selectedTags, handleTags }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState("");

  const archive = searchParams.get("archive") === "true" ? true : false;

  return (
    <div className="flex justify-start items-center md:flex-nowrap flex-wrap gap-3 text-slate-400">
      <button
        onClick={() => navigate("./editor?documentId=")}
        className="flex justify-start items-center gap-2 shadow-md bg-primary border-[1px] border-gray-800 hover:bg-blue-700 transition-all duration-500 py-3 px-5 rounded-lg w-max text-gray-200"
      >
        <span className="w-max tracking-wide text-sm font-medium">
          Add New Note
        </span>
        <BiSolidAddToQueue className="text-xl" />
      </button>

      <button className="flex justify-start items-center gap-1 bg-primary border-[1px] border-gray-800 hover:bg-blue-700 hover:text-white transition-all duration-500 text-sm py-3 px-5 shadow-md rounded-lg font-medium">
        <span className="tracking-wide">All</span>
        <HiDocument className="text-xl" />
      </button>

      <button
        className={`${
          archive
            ? "bg-glassyblue border-2 border-blue-600"
            : "bg-primary border-[1px] border-gray-800"
        } flex justify-start items-center gap-2 hover:bg-blue-700 hover:text-white transition-all duration-500 text-sm py-3 px-5 shadow-md rounded-lg font-medium`}
      >
        <span className="tracking-wide">Archive</span>
        <FaTrash className="text-base" />
      </button>

      <div className="relative">
        <button className="flex justify-start items-center gap-2 bg-primary border-[1px] border-gray-800 hover:bg-blue-700 hover:text-white transition-all duration-500 text-sm py-3 px-5 shadow-md w-max rounded-lg font-medium">
          <span className="tracking-wide w-max">Filter By Tags</span>
          <ImPriceTags className="text-xl " />
        </button>
        <FilterTags selectedTags={selectedTags} handleTags={handleTags} />
      </div>

      <input
        type="text"
        value={value}
        placeholder="Search For Notes..."
        className="p-3 rounded-lg text-sm font-medium bg-primary border-[1px] border-gray-800 w-full"
      />
    </div>
  );
};

export default Header;
