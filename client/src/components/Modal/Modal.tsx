import { useDispatch, useSelector } from "react-redux";
import { toggleModalVisibility } from "src/features/globalSlice";

const Modal = ({ children }) => {
  const modalView = useSelector((state: any) => state.global.modal);
  const dispatch = useDispatch();
  return (
    <>
      {modalView && (
        <div className="w-full h-full fixed top-0 left-0 z-[100]">
          <div
            onClick={() => dispatch(toggleModalVisibility(false))}
            className="w-full h-full bg-black opacity-70  backdrop-blur-sm"
          ></div>
          <div className="bg-primary shadow-lg rounded-lg p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
