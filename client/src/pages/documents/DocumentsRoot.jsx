import React, { useEffect } from "react";
import Header from "../../components/notes/Header";
import Collection from "../../components/notes/Collection";
import { useDispatch } from "react-redux";

const DocumentsRoot = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Notes & Docs | WorkFlow";
  }, []);

  return (
    <main className="w-full h-[100vh] overflow-y-auto">
      <div className="py-5 sm:px-6 px-4 max-w-6xl mx-auto ">
        <Header />
        <Collection />
      </div>
    </main>
  );
};

export default DocumentsRoot;
