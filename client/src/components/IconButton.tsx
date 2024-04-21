const IconButton = ({ onClick, label, icon, active }) => {
  return (
    <button
      onClick={onClick}
      className={`w-max flex justify-start items-center gap-2 ${
        active
          ? "bg-glassyblue border-2 border-blue-600"
          : "bg-primary border-[1px] border-gray-800"
      } hover:bg-blue-700 hover:text-white transition-all duration-500 text-sm py-3 px-5 shadow-md rounded-lg font-medium`}
    >
      <span className="tracking-wide">{label}</span>
      {icon}
    </button>
  );
};

export default IconButton;
