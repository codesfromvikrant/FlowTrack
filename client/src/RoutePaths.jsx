import { Routes, Route } from "react-router-dom";
import Home from "src/pages/Home";
import UserPortal from "src/pages/UserPortal";
import Protected from "src/Protected";
import Layout from "src/pages/Layout";
import DocumentsRoot from "src/pages/documents/DocumentsRoot";
import Explore from "src/pages/Explore";
import NoPage from "src/pages/NoPage";
import DocumentsEditor from "src/pages/documents/DocumentsEditor";
import DocumentsLayout from "src/pages/documents/DocumentsLayout";
import Workspaces from "src/pages/workspaces";
import WorkspaceLayout from "src/pages/workspace/WorkspaceLayout";
import WorkspaceRoot from "src/pages/workspace/WorkspaceRoot";
import Projects from "src/pages/projects/Projects";
import ProjectLayout from "src/pages/projects/ProjectLayout";
import ProjectOverview from "src/pages/projects/ProjectOverview";
import TasksLayout from "src/pages/tasks/TasksLayout";
import ProjectsDocuments from "src/pages/projects/ProjectsDocuments";
import ProjectDiscussion from "src/pages/projects/ProjectDiscussion";

const RoutePaths = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="/user"
          element={
            <Protected>
              <UserPortal />
            </Protected>
          }
        >
          <Route index element={<Explore />} />
          <Route path="*" element={<NoPage />} />

          {/* Workspaces */}
          <Route path="workspaces" element={<WorkspaceRoot />}>
            <Route index element={<Workspaces />} />
            <Route path=":workspaceId" element={<WorkspaceLayout />} />
          </Route>

          {/* Projects */}
          <Route path="projects" element={<Projects />} />
          <Route path="project/:projectId" element={<ProjectLayout />}>
            <Route index element={<ProjectOverview />} />
            <Route path="tasks" element={<TasksLayout />} />
            <Route path="documents" element={<ProjectsDocuments />}>
              <Route index element={<DocumentsLayout />} />
              <Route path="editor" element={<DocumentsEditor />} />
            </Route>
            <Route path="discussion" element={<ProjectDiscussion />} />
          </Route>

          {/* Documents */}
          <Route path="documents" element={<DocumentsRoot />}>
            <Route index element={<DocumentsLayout />} />
            <Route path="editor" element={<DocumentsEditor />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
};

export default RoutePaths;
