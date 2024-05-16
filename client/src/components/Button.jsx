import React from "react";

const Button = ({ onClick, label, className, icon, active }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} w-full flex justify-center items-center gap-2 ${
        active
          ? "bg-glassyblue border-2 border-blue-600"
          : "bg-primary border-[1px] border-gray-800"
      } hover:bg-blue-700 text-gray-200 hover:text-white transition-all duration-500 text-sm py-2 px-3 shadow-md rounded-lg font-medium`}
    >
      <span className="tracking-wide">{label}</span>
      {icon}
    </button>
  );
};

export default Button;
