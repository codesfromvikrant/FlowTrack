import { BiSolidAddToQueue } from "react-icons/bi";
import { HiDocument } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import { ImPriceTags } from "react-icons/im";
import { useNavigate, useSearchParams } from "react-router-dom";
import FilterTags from "./DocumentTags/FilterTags";
import Button from "src/components/Button";
import IconButton from "src/components/IconButton";
import SearchBar from "src/components/SearchBar";

const Header = ({ selectedTags, handleTags, searchTerm, handleSearch }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const Pinned = searchParams.get("pinned") === "true" ? true : false;

  return (
    <div className="flex justify-start items-center md:flex-nowrap flex-wrap gap-3 text-slate-700">
      <Button
        onClick={() => navigate("./editor?documentId=")}
        label="New"
        icon={<BiSolidAddToQueue className="text-xl" />}
        active={false}
        className="w-max"
      />

      <Button
        onClick={() => setSearchParams("")}
        label="All"
        icon={<HiDocument className="text-xl" />}
        active={false}
        className="w-max"
      />

      <Button
        onClick={() => setSearchParams({ pinned: !Pinned })}
        label="Pinned"
        icon={<FaTrash className="text-base" />}
        active={false}
        className="w-max"
      />

      <div className="relative">
        <Button
          onClick={handleTags}
          label="Filter By Tags"
          icon={<ImPriceTags className="text-xl" />}
          active={false}
          className="w-max"
        />
        <FilterTags selectedTags={selectedTags} handleTags={handleTags} />
      </div>

      <SearchBar
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        placeholder="Search For Documents..."
      />
    </div>
  );
};

export default Header;
