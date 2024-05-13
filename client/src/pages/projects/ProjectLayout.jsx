import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import ProjectHeader from "src/components/projects/ProjectHeader";
import { getCurrentProjectData } from "src/features/projectsSlice";

const ProjectLayout = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { projectId } = params;

  useEffect(() => {
    if (!projectId) return;
    dispatch(getCurrentProjectData(projectId));
  }, [projectId]);

  return (
    <main className="w-full">
      <ProjectHeader />
    </main>
  );
};

export default ProjectLayout;
