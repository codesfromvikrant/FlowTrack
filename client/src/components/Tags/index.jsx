import React, { useEffect, useState } from "react";
import Button from "../Button";
import { FaTags } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getAllTags } from "src/features/globalSlice";
import TagsListItem from "./TagsListItem";

const Tags = ({ selectedTags, handleSelectedTags }) => {
  const dispatch = useDispatch();
  const [activeTagsList, setActiveTagsList] = useState(false);
  const tags = useSelector((state) => state.global.tags.data);

  const toggleTagsList = (e) => {
    e.preventDefault();
    setActiveTagsList(!activeTagsList);
  };

  useEffect(() => {
    dispatch(getAllTags());
  }, []);

  const renderTagsListItem = tags?.map((item) => {
    return (
      <TagsListItem
        data={item}
        key={item._id}
        checked={selectedTags?.includes(item._id) ? true : false}
        handleSelectedTags={handleSelectedTags}
      />
    );
  });

  return (
    <div className="relative w-full">
      <Button
        label="Add Tags"
        className="text-slate-600 font-semibold hover:text-white text-sm shadow-none bg-secondary"
        icon={<FaTags className="" />}
        onClick={toggleTagsList}
        active={false}
      />

      {activeTagsList && (
        <div className="space-y-2 my-2 absolute w-full bg-primary">
          {renderTagsListItem}
        </div>
      )}
    </div>
  );
};

export default Tags;
