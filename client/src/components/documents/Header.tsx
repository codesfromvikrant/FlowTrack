import { BiSolidAddToQueue } from "react-icons/bi";
import { HiDocument } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import { ImPriceTags } from "react-icons/im";
import { useNavigate, useSearchParams } from "react-router-dom";
import FilterTags from "./documentTags/FilterTags";
import IconButton from "../IconButton";
import SearchBar from "../SearchBar";

interface HeaderProps {
  selectedTags: string[];
  handleTags: () => void;
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header: React.FC<HeaderProps> = ({
  selectedTags,
  handleTags,
  searchTerm,
  handleSearch,
}) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const Pinned = searchParams.get("pinned") === "true" ? true : false;

  return (
    <div className="flex justify-start items-center md:flex-nowrap flex-wrap gap-3 text-slate-400">
      <IconButton
        onClick={() => navigate("./editor?documentId=")}
        label="New"
        icon={<BiSolidAddToQueue className="text-xl" />}
        active={false}
      />

      <IconButton
        onClick={() => setSearchParams("")}
        label="All"
        icon={<HiDocument className="text-xl" />}
        active={false}
      />

      <IconButton
        onClick={() => setSearchParams({ pinned: !Pinned })}
        label="Pinned"
        icon={<FaTrash className="text-base" />}
        active={false}
      />

      <div className="relative">
        <IconButton
          onClick={handleTags}
          label="Filter By Tags"
          icon={<ImPriceTags className="text-xl" />}
          active={false}
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
