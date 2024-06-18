import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { useMemo } from "react";
import Button from "src/components/Button";

const ProjectHeader = () => {
  const { projectId } = useParams();
  const { projects } = useSelector((state) => state.projects);
  const currentProjectData = projects?.currentData;

  const navs = [
    {
      name: "Overview",
      path: `/user/project/${projectId}/overview`,
    },
    {
      name: "Tasks",
      path: `/user/project/${projectId}/tasks`,
    },
    {
      name: "Documents",
      path: `/user/project/${projectId}/documents`,
    },
    {
      name: "Discussion",
      path: `/user/project/${projectId}/discussion`,
    },
  ];

  const NavLinkItems = useMemo(() => {
    return navs.map((nav, index) => (
      <NavLink
        key={index}
        to={nav.path}
        style={({ isActive }) => ({
          borderBottom: isActive ? "3px solid #3b82f6" : "",
        })}
        className="cursor-pointer hover:text-blue-500 w-max py-2"
      >
        <span className="text-gray-600 font-medium">{nav.name}</span>
      </NavLink>
    ));
  }, [navs]);

  return (
    <div className="w-full px-10 pt-4 bg-white border-b-2 border-slate-200">
      <div className="flex justify-between items-center gap-4">
        <span className="text-xl text-gray-700 font-semibold">
          {currentProjectData?.name}
        </span>

        <div className="flex justify-start items-center gap-2 text-gray-200">
          <Button onClick={() => {}} label="Edit" active={false} />
          <Button onClick={() => {}} label="Trash" active={false} />
        </div>
      </div>

      <nav className="flex justify-start items-start gap-6">{NavLinkItems}</nav>
    </div>
  );
};

export default ProjectHeader;
