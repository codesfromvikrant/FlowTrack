import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Dropdown = ({ triggerComponent, dropdownItems }) => {
  const renderDropdownItems = dropdownItems.map((item) => (
    <DropdownMenuItem
      key={item.label}
      onClick={item.onClick}
      className="text-sm font-medium"
    >
      {item.label}
    </DropdownMenuItem>
  ));

  console.log("dropdownItems", dropdownItems);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{triggerComponent}</DropdownMenuTrigger>
      <DropdownMenuContent>{renderDropdownItems}</DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
