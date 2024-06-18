import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useParams } from "react-router-dom";
import { getAllDocuments } from "src/features/documentsSlice";

const useDocsFilter = () => {
  const dispatch = useDispatch();
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const { projectId } = useParams();

  const handleTags = (id) => {
    if (selectedTags.includes(id)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== id));
      return;
    }
    setSelectedTags([...selectedTags, id]);
  };

  let debounceTimer;

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      dispatch(
        getAllDocuments({
          page: 1,
          limit,
          filterTags: selectedTags,
          searchTerm: e.target.value,
        })
      );
    }, 300);
  };

  useEffect(() => {
    const data = { page, limit, filterTags: selectedTags, searchTerm };
    projectId ? (data.projectId = projectId) : null;
    dispatch(getAllDocuments(data));

    document.title = "Documents | WorkFlow";
  }, [page, limit, selectedTags]);

  return { selectedTags, limit, searchTerm, handleTags, handleSearch };
};

export default useDocsFilter;
