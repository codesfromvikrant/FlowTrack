import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { useParams } from "react-router-dom";
import { getAllDocuments } from "src/features/documentsSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DocumentsLayout = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();

  useEffect(() => {
    document.title = "Documents | WorkFlow";
    dispatch(getAllDocuments({ projectId }));
  }, []);

  return (
    <main className="w-full h-[100vh] overflow-y-auto">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Outlet />
    </main>
  );
};

export default DocumentsLayout;
