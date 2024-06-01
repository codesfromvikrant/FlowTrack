import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const Menu = ({ onClick }) => {
  return (
    <i
      onClick={onClick}
      className="fa-solid fa-ellipsis text-xl hover:text-blue-500 cursor-pointer"
    ></i>
  );
};

export default Menu;
