import { Routes, Route } from "react-router-dom";
import Home from "src/pages/Home";
import UserPortal from "src/pages/UserPortal";
import Protected from "src/Protected";
import Layout from "src/pages/Layout";
import DocumentsRoot from "src/pages/documents/DocumentsRoot";
import Explore from "src/pages/Explore";
import NoPage from "src/pages/NoPage";
import DocumentsEditor from "./pages/documents/DocumentsEditor";
import DocumentsLayout from "./pages/documents/DocumentsLayout";
import Workspaces from "./pages/Workspaces";
import WorkspaceLayout from "./pages/workspace/WorkspaceLayout";
import WorkspaceRoot from "./pages/workspace/WorkspaceRoot";
import Projects from "./pages/projects/Projects";
import ProjectLayout from "./pages/projects/ProjectLayout";
import ProjectOverview from "./pages/projects/ProjectOverview";
import TaskLayout from "./pages/tasks/TasksLayout";
import TasksLayout from "./pages/tasks/TasksLayout";
import ProjectsDocuments from "./pages/projects/ProjectsDocuments";
import ProjectDiscussion from "./pages/projects/ProjectDiscussion";

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
            <Route path="documents" element={<ProjectsDocuments />} />
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
