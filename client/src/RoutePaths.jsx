import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserPortal from "./pages/UserPortal";
import Protected from "./Protected";
import Layout from "./pages/Layout";

import Explore from "./pages/Explore";
import NoPage from "./pages/NoPage";

import DocumentsLayout from "./pages/documents/Layout";
import DocumentsEditor from "./pages/documents/Editor";
import DocumentsDashboard from "./pages/documents/Dashboard";

import Workspaces from "src/pages/Workspaces";

import WorkspaceLayout from "./pages/workspace/WorkspaceLayout";
import WorkspaceRoot from "./pages/workspace/WorkspaceRoot";

import Projects from "./pages/projects/Projects";
import ProjectLayout from "./pages/projects/ProjectLayout";
import ProjectOverview from "./pages/projects/ProjectOverview";
import TasksLayout from "./pages/tasks/TasksLayout";
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
            <Route path="documents" element={<DocumentsLayout />}>
              <Route index element={<DocumentsDashboard />} />
              <Route path="editor" element={<DocumentsEditor />} />
            </Route>
            <Route path="discussion" element={<ProjectDiscussion />} />
          </Route>

          {/* Documents */}
          <Route path="documents" element={<DocumentsLayout />}>
            <Route index element={<DocumentsDashboard />} />
            <Route path="editor" element={<DocumentsEditor />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
};

export default RoutePaths;
