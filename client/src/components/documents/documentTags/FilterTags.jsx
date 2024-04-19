import React from "react";
import TagsList from "./TagsList";
import useDocsFilter from "src/hooks/useDocsFilter";

const FilterTags = ({ selectedTags, handleTags }) => {
  return (
    <div className="absolute top-14 left-0 bg-primary p-4 rounded-lg z-[100] w-full">
      <TagsList selectedTags={selectedTags} handleTags={handleTags} />
    </div>
  );
};

export default FilterTags;
