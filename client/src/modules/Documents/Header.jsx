import { BiSolidAddToQueue } from "react-icons/bi";
import { HiDocument } from "react-icons/hi";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBar from "src/components/SearchBar";
import Tags from "@/components/Tags";
import TagsDropdown from "@/components/Tags/TagsDropdown";
import { Button } from "@/components/ui/button";

const Header = ({ selectedTags, handleTags, searchTerm, handleSearch }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const Pinned = searchParams.get("pinned") === "true" ? true : false;

  return (
    <div className="flex justify-start items-center md:flex-nowrap flex-wrap gap-3">
      <Button
        onClick={() => navigate("./editor?documentId=")}
        variant="outline"
      >
        <span className="space-x-2 flex">
          <BiSolidAddToQueue className="text-xl" />
          <span>Documents</span>
        </span>
      </Button>

      <Button onClick={() => setSearchParams("")} variant="outline">
        <span className="space-x-2 flex">
          <HiDocument className="text-xl" />
          <span>All</span>
        </span>
      </Button>

      <Button
        onClick={() => setSearchParams({ pinned: !Pinned })}
        variant="outline"
      >
        <span className="space-x-2 flex">
          <HiDocument className="text-xl" />
          <span>Pinned</span>
        </span>
      </Button>

      <TagsDropdown
        selectedTags={selectedTags}
        handleSelectedTags={handleTags}
        triggerComponent={<Button variant="outline">Tags</Button>}
      />

      <SearchBar
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        placeholder="Search For Documents..."
      />
    </div>
  );
};

export default Header;
