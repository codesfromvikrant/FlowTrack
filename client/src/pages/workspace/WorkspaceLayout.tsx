import Pagination from "src/components/Pagination";
import Table from "src/components/Table";
import WorkspaceHeader from "src/components/workspace/WorkspaceHeader";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWorkspaceProjects,
  toggleActiveCreateProject,
} from "src/features/projectsSlice";
import Modal from "src/components/Modal/Modal";
import ProjectForm from "src/components/projects/ProjectForm";
import { setWorkspaceId } from "src/features/workspaceSlice";

const WorkspaceLayout = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigation = useNavigate();
  const { workspaceId } = params;

  const projects = useSelector((state: any) => state.projects.projects.data);
  const activeCreateProject = useSelector(
    (state: any) => state.projects.activeCreateProject
  );

  const handleActiveCreateProject = () => dispatch(toggleActiveCreateProject());

  useEffect(() => {
    if (!workspaceId) return;
    dispatch(getWorkspaceProjects(workspaceId));
    dispatch(setWorkspaceId(workspaceId));
  }, [workspaceId]);

  const handleProject = (id) => {
    navigation(`/user/project/${id}`);
  };

  const columns = ["name", "status", "priority", "deadline"];
  return (
    <main className="max-w-5xl mx-auto my-8">
      <WorkspaceHeader />

      <Modal
        active={activeCreateProject}
        handleActive={handleActiveCreateProject}
      >
        <ProjectForm />
      </Modal>

      <Table
        columns={columns}
        data={projects}
        handleClick={(id) => handleProject(id)}
      />

      <Pagination totalCount={200} docsPerPage={10} />
    </main>
  );
};

export default WorkspaceLayout;
