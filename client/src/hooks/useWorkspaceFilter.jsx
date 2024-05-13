import { useState } from "react";
import { useDispatch } from "react-redux";

const useWorkspaceFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  let debounceTimer;
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      dispatch(getAllDocuments(1, docsPerPage, selectedTags, e.target.value));
    }, 300);
  };

  return {
    searchTerm,
    handleSearch,
  };
};

export default useWorkspaceFilter;
