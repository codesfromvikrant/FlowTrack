import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "src/pages/Home";
import UserPortal from "src/pages/UserPortal";
import Protected from "src/Protected";
import Gallery from "src/pages/Gallery";
import Layout from "src/pages/Layout";
import DocumentsRoot from "src/pages/documents/DocumentsRoot";
import Explore from "src/pages/Explore";
import ProjectHome from "src/components/projects/ProjectHome";
import NoPage from "src/pages/NoPage";
import TaskManager from "src/components/projects/TaskManager";
import ProjectsLab from "src/pages/ProjectsLab";
import DocumentsEditor from "./pages/documents/DocumentsEditor";
import DocumentsCollection from "./pages/documents/DocumentsCollection";

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
          <Route path="projects" element={<ProjectsLab />}>
            <Route index element={<ProjectHome />} />
            <Route path="tasks" element={<TaskManager />} />
          </Route>
          <Route path="gallery" element={<Gallery />} />
          {/* Documents */}
          <Route path="documents" element={<DocumentsRoot />}>
            <Route index element={<DocumentsCollection />} />
            <Route path="editor" element={<DocumentsEditor />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
};

export default RoutePaths;
