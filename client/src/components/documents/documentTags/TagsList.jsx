import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTags } from "src/features/documentsSlice";
import { TiTick } from "react-icons/ti";

const TagsList = ({ selectedTags, handleTags }) => {
  const dispatch = useDispatch();
  const allTags = useSelector((state) => state.documents.tags.data);

  useEffect(() => {
    dispatch(getAllTags());
  }, []);

  const tags = allTags?.map((tag) => {
    return (
      <li
        onClick={() => handleTags(tag._id)}
        className={`${
          selectedTags.includes(tag._id) ? "text-blue-600" : "text-gray-400"
        } py-1 flex justify-between items-center gap-4 cursor-pointer hover:text-blue-500 transition-all duration-300`}
      >
        <p>{tag.name}</p>
        <TiTick />
      </li>
    );
  });

  return <ul className="text-sm font-medium capitalize">{tags}</ul>;
};

export default TagsList;
