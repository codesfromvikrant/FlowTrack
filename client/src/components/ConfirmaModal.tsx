import { setConfirmModal } from "src/features/globalSlice";
import { useDispatch } from "react-redux";

const ConfirmaModal = ({ children, handleOk }) => {
  const dispatch = useDispatch();
  return (
    <div className="w-full h-full fixed top-0 left-0 z-[100]">
      <div className="w-full h-full bg-black opacity-50 backdrop-blur-lg"></div>
      <div className="bg-primary shadow-lg rounded-lg p-4 absolute top-20 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="">{children}</div>
        <div className="flex justify-end items-end gap-3 text-gray-200 text-sm mt-4 w-full">
          <button
            onClick={handleOk}
            className="bg-primary border-[1px] border-gray-800 hover:bg-blue-700 hover:text-white transition-all duration-500 py-3 px-5 shadow-md rounded-lg font-medium"
          >
            Ok
          </button>
          <button
            onClick={() => dispatch(setConfirmModal(false))}
            className="bg-primary border-[1px] border-gray-800 hover:bg-blue-700 hover:text-white transition-all duration-500 py-3 px-5 shadow-md rounded-lg font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmaModal;
