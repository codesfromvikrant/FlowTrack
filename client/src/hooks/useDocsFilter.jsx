import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getAllDocuments } from "src/features/documentsSlice";

const useDocsFilter = () => {
  const dispatch = useDispatch();
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();
  const docsPerPage = 10;
  const page = Number(searchParams.get("page")) || 1;
  const docsperpage = Number(searchParams.get("docsperpage")) || docsPerPage;

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
      dispatch(getAllDocuments(1, docsPerPage, selectedTags, e.target.value));
    }, 300);
  };

  useEffect(() => {
    dispatch(getAllDocuments(page, docsperpage, selectedTags, searchTerm));
  }, [page, docsperpage, selectedTags]);

  return { selectedTags, docsPerPage, searchTerm, handleTags, handleSearch };
};

export default useDocsFilter;
