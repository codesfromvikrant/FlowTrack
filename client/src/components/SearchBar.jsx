import { ImSearch } from "react-icons/im";

const SearchBar = ({ handleSearch, searchTerm, placeholder, className }) => {
  return (
    <div
      className={`flex justify-start items-center gap-3 w-full bg-white py-2 px-5 rounded-lg border-[1px] border-gray-200 text-slate-600 ${className}`}
    >
      <ImSearch className="text-xl" />
      <input
        onChange={handleSearch}
        value={searchTerm}
        className={
          "w-full placeholder:font-medium text-sm placeholder:text-slate-600 text-slate-700 font-semibold bg-transparent outline-none border-none"
        }
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
