import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import IconButton from "../IconButton";

const ProjectHeader = () => {
  const { projects } = useSelector((state) => state.projects);
  const currentProjectData = projects?.currentData;

  console.log("currentProjectData", currentProjectData);

  return (
    <div className="w-full px-10 pt-4 bg-primary">
      <div className="flex justify-between items-center gap-4">
        <span className="text-xl text-gray-200 font-medium">
          {currentProjectData?.name}
        </span>

        <div className="flex justify-start items-center gap-2 text-gray-200">
          <IconButton
            onClick={() => {}}
            label="Edit"
            icon={<MdEdit />}
            active={false}
          />
          <IconButton
            onClick={() => {}}
            label="Trash"
            icon={<FaTrash />}
            active={false}
          />
        </div>
      </div>

      <div className="flex justify-start items-start gap-6">
        <div className="cursor-pointer hover:border-b-2 border-b-white w-max py-2">
          <span className="text-gray-300">Overview</span>
        </div>

        <div className="cursor-pointer hover:border-b-2 border-b-white w-max py-2">
          <span className="text-gray-300">Tasks</span>
        </div>

        <div className="cursor-pointer hover:border-b-2 border-b-white w-max py-2">
          <span className="text-gray-300">Documents</span>
        </div>

        <div className="cursor-pointer hover:border-b-2 border-b-white w-max py-2">
          <span className="text-gray-300">Discussions</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
