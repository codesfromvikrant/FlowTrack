import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import ProjectHeader from "src/modules/Projects/ProjectHeader";
import { getCurrentProjectData } from "src/features/projectsSlice";
import { Outlet } from "react-router-dom";
import { setProjectId } from "src/features/projectsSlice";

const ProjectLayout = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { projectId } = params;

  useEffect(() => {
    if (!projectId) return;
    dispatch(getCurrentProjectData(projectId));
    dispatch(setProjectId(projectId));
  }, [projectId]);

  return (
    <main className="w-full bg-slate-100">
      <ProjectHeader />
      <Outlet />
    </main>
  );
};

export default ProjectLayout;
