import React from "react";

const Modal = ({ children, active, handleActive, widthClass }) => {
  return (
    <>
      {active && (
        <div className="w-full h-full fixed top-0 left-0 z-[100]">
          <div
            onClick={handleActive}
            className="w-full h-full bg-black opacity-70  backdrop-blur-sm"
          ></div>
          <div
            className={`bg-primary shadow-lg rounded-lg p-4 absolute max-h-[80vh] overflow-y-scroll top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${widthClass}`}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
