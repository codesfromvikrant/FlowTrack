import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTags } from "@/features/globalSlice";
import TagsListItem from "./TagsListItem";

export default function TagsDropdown({
  selectedTags,
  handleSelectedTags,
  triggerComponent,
}) {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.global.tags.data);

  useEffect(() => {
    dispatch(getAllTags());
  }, []);

  const renderDropdownMenuItem = tags.map((tag) => (
    <DropdownMenuItem key={tag._id}>
      <TagsListItem
        item={tag}
        key={tag._id}
        checked={selectedTags?.includes(tag._id) ? true : false}
        handleSelectedTags={handleSelectedTags}
      />
    </DropdownMenuItem>
  ));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{triggerComponent}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        <DropdownMenuSeparator />
        {renderDropdownMenuItem}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
