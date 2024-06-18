import React, { useEffect, useRef } from "react";

const Dropdown = ({ active, handleActive, menulist }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        handleActive();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const renderDropdownList = menulist.map((item, index) => (
    <div
      key={index}
      className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
      onClick={item.onClick}
    >
      {item.text}
    </div>
  ));

  if (!active) return null;
  return (
    <div
      ref={dropdownRef}
      className="absolute -bottom-4 right-0 bg-white shadow-md z-[100] flex justify-start items-start flex-col"
    >
      {renderDropdownList}
    </div>
  );
};

export default Dropdown;
