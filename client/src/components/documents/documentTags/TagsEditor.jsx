import React from "react";
import TagsList from "./TagsList";
import AddTag from "./AddTag";

const TagsEditor = ({ selectedTags, handleTags }) => {
  return (
    <div className="absolute top-12 left-0 bg-primary p-4 rounded-lg z-[100]">
      <TagsList selectedTags={selectedTags} handleTags={handleTags} />
      <AddTag />
    </div>
  );
};

export default TagsEditor;
