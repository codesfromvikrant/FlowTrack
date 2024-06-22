"use client";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const TagsListItem = ({ item, checked, handleSelectedTags }) => {
  const [active, setActive] = useState(checked);

  const handleActive = () => {
    setActive(!active);
    handleSelectedTags(item._id);
  };

  return (
    <div className="flex items-center space-x-2">
      <Checkbox checked={active} onCheckedChange={handleActive} id="tag" />
      <label
        htmlFor="tag"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {item.name}
      </label>
    </div>
  );
};

export default TagsListItem;
