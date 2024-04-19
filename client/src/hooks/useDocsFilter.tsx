import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllDocuments } from "src/features/documentsSlice";

const useDocsFilter = () => {
  const dispatch = useDispatch();
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTags = (id) => {
    if (selectedTags.includes(id)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== id));
      return;
    }
    setSelectedTags([...selectedTags, id]);
  };

  useEffect(() => {
    dispatch(getAllDocuments(selectedTags));
  }, [selectedTags]);

  return { selectedTags, handleTags };
};

export default useDocsFilter;
