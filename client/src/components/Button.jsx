import React from "react";

const Button = ({ onClick, label, className, icon, active }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex justify-center items-center gap-2 ${
        active
          ? "bg-glassyblue border-2 border-blue-600 text-blue-700"
          : "bg-primary text-slate-600"
      } hover:bg-blue-700 transition-all duration-500 text-sm py-2 px-3 shadow-md rounded-lg font-semibold ${className}`}
    >
      <span className="tracking-wide">{label}</span>
      {icon}
    </button>
  );
};

export default Button;
