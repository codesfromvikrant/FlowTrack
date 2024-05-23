import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "src/components/Button";
import SearchBar from "src/components/SearchBar";
import { BiSolidAddToQueue } from "react-icons/bi";
import useWorkspaceFilter from "src/hooks/useWorkspaceFilter";
import SelectInput from "src/components/SelectInput";
import { toggleActiveCreateProject } from "src/features/projectsSlice";
import { useDispatch } from "react-redux";

const WorkspaceHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchTerm, handleSearch } = useWorkspaceFilter();

  const statusData = {
    todo: "To Do",
    inprogress: "In Progress",
    completed: "Completed",
  };

  const priorityData = {
    minor: "minor",
    major: "major",
    critical: "critical",
  };

  const handleActiveCreateProject = () => dispatch(toggleActiveCreateProject());

  return (
    <div className="flex justify-start items-center md:flex-nowrap flex-wrap gap-3 text-slate-400">
      <Button
        onClick={handleActiveCreateProject}
        label="New"
        icon={<BiSolidAddToQueue className="text-xl" />}
        active={false}
        className="w-max hover:text-gray-200"
      />

      <SelectInput data={statusData} />
      <SelectInput data={priorityData} />

      <SearchBar
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        placeholder="Search For Documents..."
      />
    </div>
  );
};

export default WorkspaceHeader;
