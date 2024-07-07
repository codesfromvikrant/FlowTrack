const Modal = ({ children, isOpen, onClose, className }) => {
  return (
    <>
      {isOpen && (
        <>
          <div
            onClick={onClose}
            className="bg-black opacity-35 fixed top-0 left-0 h-screen w-screen"
          ></div>
          <div
            className={`${className} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  max-h-[80vh] overflow-y-auto `}
          >
            {children}
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
