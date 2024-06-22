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

import Workspace from "@/pages/workspace";
import WorkspaceBoard from "@/pages/workspace/Board";
import WorkspaceLayout from "@/pages/workspace/Layout";
import WorkspaceOverview from "@/pages/workspace/Overview";
import WorkspaceDiscussion from "@/pages/workspace/Discussion";

import TasksLayout from "./pages/tasks/Layout";

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
          <Route path="workspaces" element={<WorkspaceLayout />}>
            <Route index element={<WorkspaceBoard />} />
            <Route path=":workspaceId" element={<Workspace />}>
              <Route path="overview" element={<WorkspaceOverview />} />
              <Route path="tasks" element={<TasksLayout />} />
              <Route path="documents" element={<DocumentsLayout />}>
                <Route index element={<DocumentsDashboard />} />
                <Route path="editor" element={<DocumentsEditor />} />
              </Route>
              <Route path="discussion" element={<WorkspaceDiscussion />} />
            </Route>
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
