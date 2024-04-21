import { ImSearch } from "react-icons/im";

const SearchBar = ({ handleSearch, searchTerm, placeholder }) => {
  return (
    <div className="flex justify-start items-center gap-3 w-full bg-primary border-[1px] border-gray-800 py-3 px-5 rounded-lg text-slate-400">
      <ImSearch className="text-xl" />
      <input
        onChange={handleSearch}
        value={searchTerm}
        className="w-full placeholder:font-medium text-sm placeholder:text-slate-400 text-gray-200 bg-transparent outline-none border-none"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
