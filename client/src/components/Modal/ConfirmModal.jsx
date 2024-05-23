// import { useDispatch } from "react-redux";
// import Modal from "./Modal";

// const ConfirmModal = ({ children, handleOk }) => {
//   const dispatch = useDispatch();
//   return (
//     <Modal active={true} >
//       <div className="">{children}</div>
//       <div className="flex justify-end items-end gap-3 text-gray-200 text-sm mt-4 w-full">
//         <button
//           onClick={handleOk}
//           className="bg-primary border-[1px] border-gray-800 hover:bg-blue-700 hover:text-white transition-all duration-500 py-3 px-5 shadow-md rounded-lg font-medium"
//         >
//           Ok
//         </button>
//         <button
//           onClick={() => dispatch(toggleModalVisibility(false))}
//           className="bg-primary border-[1px] border-gray-800 hover:bg-blue-700 hover:text-white transition-all duration-500 py-3 px-5 shadow-md rounded-lg font-medium"
//         >
//           Cancel
//         </button>
//       </div>
//     </Modal>
//   );
// };

// export default ConfirmModal;
