import React, { useState } from "react";
import Dropdown from "./Dropdown";

const Menu = ({ menulist }) => {
  const [active, setActive] = useState(false);

  const handleActive = () => {
    setActive(!active);
  };

  return (
    <div className="relative">
      <i
        onClick={handleActive}
        className="fa-solid fa-ellipsis text-xl hover:text-blue-500 cursor-pointer"
      ></i>
      <Dropdown
        active={active}
        handleActive={handleActive}
        menulist={menulist}
      />
    </div>
  );
};

export default Menu;
